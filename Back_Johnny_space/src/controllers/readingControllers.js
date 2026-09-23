const readingService = require('../services/readingService');
const readingRepository = require('../repository/readingRepository');

class ReadingController {
    // POST /api/readings - Créer une nouvelle lecture
    async createReading(req, res, next) {
        try {
            const { temperature, humidity, soil_humidity } = req.body;

            // Valider les paramètres
            if (temperature === undefined || humidity === undefined || soil_humidity === undefined) {
                return res.status(400).json({
                    error: 'temperature, humidity, soil_humidity sont requis',
                    status: 400
                });
            }

            // Traiter la lecture
            const reading = await readingService.handleNewReading({
                temperature,
                humidity,
                soil_humidity,
                is_valid: true
            });

            res.status(201).json({
                message: 'Lecture créée avec succès',
                data: reading
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/readings/status - État actuel de la plante
    async getStatus(req, res, next) {
        try {
            const status = await readingService.getPlantStatus();
            res.json(status);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/readings/history - Historique (dernières 24h par défaut)
    async getHistory(req, res, next) {
        try {
            const hours = req.query.hours || 24;
            const history = await readingRepository.getReadingHistory(hours);

            res.json({
                hours,
                count: history.length,
                data: history
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/readings/stats - Statistiques (min/max/avg)
    async getStats(req, res, next) {
        try {
            const hours = req.query.hours || 24;
            const stats = await readingRepository.getReadingStats(hours);

            res.json({
                hours,
                stats
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReadingController();