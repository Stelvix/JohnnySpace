// Schéma pour les alertes

class Alert {
    constructor(data = {}) {
        this.id = data.id || null;
        this.type = data.type || null; // 'soil_dry', 'temp_high', 'temp_low', etc.
        this.severity = data.severity || 'warning'; // 'info', 'warning', 'critical'
        this.message = data.message || null;
        this.reading_id = data.reading_id || null; // Référence à la lecture
        this.block_auto_watering = data.block_auto_watering || false;
        this.acknowledged = data.acknowledged || false;
        this.created_at = data.created_at || new Date();
    }

    // Valider
    validate() {
        const errors = [];

        if (!this.type) errors.push('type is required');
        if (!this.message) errors.push('message is required');
        if (!['info', 'warning', 'critical'].includes(this.severity)) {
            errors.push('severity must be info, warning, or critical');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Marquer comme lue
    acknowledge() {
        this.acknowledged = true;
    }

    // Vérifier si elle bloque l'arrosage automatique
    blocksAutoWatering() {
        return this.block_auto_watering && !this.acknowledged;
    }

    // Templates d'alertes courantes
    static createSoilDryAlert(readingId, soilHumidity) {
        return new Alert({
            type: 'soil_dry',
            severity: 'warning',
            message: `Soil humidity low: ${soilHumidity.toFixed(1)}%`,
            reading_id: readingId,
            block_auto_watering: false
        });
    }

    static createInvalidDataAlert(readingId) {
        return new Alert({
            type: 'invalid_data',
            severity: 'critical',
            message: 'Sensor data is invalid. Auto watering blocked.',
            reading_id: readingId,
            block_auto_watering: true
        });
    }

    static createTemperatureAlert(readingId, temp, tempMin, tempMax) {
        const type = temp < tempMin ? 'temp_low' : 'temp_high';
        const limit = temp < tempMin ? tempMin : tempMax;

        return new Alert({
            type,
            severity: 'warning',
            message: `Temperature out of range: ${temp.toFixed(1)}°C (limit: ${limit}°C)`,
            reading_id: readingId,
            block_auto_watering: false
        });
    }
}

module.exports = Alert;