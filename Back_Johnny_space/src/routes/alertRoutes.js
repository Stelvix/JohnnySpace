const express = require('express');
const alertController = require('../controllers/alertController');

const router = express.Router();

/**
 * GET /api/alerts
 * Récupérer les alertes récentes
 * Query: ?limit=20
 */
router.get('/', alertController.getAlerts);

/**
 * GET /api/alerts/unacknowledged
 * Récupérer les alertes non lues
 */
router.get('/unacknowledged', alertController.getUnacknowledged);

/**
 * GET /api/alerts/blocking
 * Récupérer les alertes qui bloquent l'arrosage automatique
 */
router.get('/blocking', alertController.getBlockingAlerts);

/**
 * PUT /api/alerts/:id/acknowledge
 * Marquer une alerte comme lue
 */
router.put('/:id/acknowledge', alertController.acknowledgeAlert);

module.exports = router;