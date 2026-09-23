const express = require('express');
const readingController = require('../controllers/readingController');

const router = express.Router();

/**
 * POST /api/readings
 * Créer une nouvelle lecture de capteur
 * Body: { temperature, humidity, soil_humidity }
 */
router.post('/', readingController.createReading);

/**
 * GET /api/readings/status
 * Récupérer l'état actuel de la plante
 */
router.get('/status', readingController.getStatus);

/**
 * GET /api/readings/history
 * Récupérer l'historique (24h par défaut)
 * Query: ?hours=24
 */
router.get('/history', readingController.getHistory);

/**
 * GET /api/readings/stats
 * Récupérer les statistiques (min/max/avg)
 * Query: ?hours=24
 */
router.get('/stats', readingController.getStats);

module.exports = router;