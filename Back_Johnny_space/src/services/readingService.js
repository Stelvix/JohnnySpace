const Reading = require('../models/Reading');
const readingRepository = require('../repository/readingRepository');
const env = require('../config/env');

class ReadingService {
    // Traiter une nouvelle lecture
    async handleNewReading(data) {
        const reading = new Reading(data);

        // Valider
        const validation = reading.validate();
        if (!validation.isValid) {
            throw new Error(`Validation échouée: ${validation.errors.join(', ')}`);
        }

        // Sauvegarder
        const savedReading = await readingRepository.createReading(reading);

        // Analyser et créer les alertes
        await this.analyzeAndCreateAlerts(savedReading);

        return savedReading;
    }

    // Analyser et créer les alertes
    async analyzeAndCreateAlerts(reading) {
        const AlertService = require('./alertService');

        // R01: Sol trop sec
        if (reading.soil_humidity < env.SOIL_DRY) {
            await AlertService.createAlert({
                type: 'soil_dry',
                severity: 'warning',
                message: `Sol trop sec: ${reading.soil_humidity}%`,
                reading_id: reading.id,
                block_auto_watering: false
            });
        }

        // Température hors limites
        if (reading.temperature < env.TEMP_MIN || reading.temperature > env.TEMP_MAX) {
            await AlertService.createAlert({
                type: 'temperature',
                severity: 'warning',
                message: `Température hors limites: ${reading.temperature}°C`,
                reading_id: reading.id
            });
        }

        // Données invalides
        if (!reading.is_valid) {
            await AlertService.createAlert({
                type: 'invalid_data',
                severity: 'critical',
                message: 'Données invalides. Arrosage automatique bloqué.',
                reading_id: reading.id,
                block_auto_watering: true
            });
        }
    }

    // Récupérer le statut actuel
    async getPlantStatus() {
        const latest = await readingRepository.getLatestReading();
        const stats = await readingRepository.getReadingStats(24);
        const AlertService = require('./alertService');
        const alerts = await AlertService.getBlockingAlerts();

        return {
            current: {
                temperature: latest?.temperature,
                humidity: latest?.humidity,
                soil_humidity: latest?.soil_humidity,
                timestamp: latest?.timestamp,
                freshness: latest?.getDataFreshness?.() || 'unavailable'
            },
            stats24h: stats,
            autoWateringBlocked: alerts.length > 0,
            alerts
        };
    }
}

module.exports = new ReadingService();