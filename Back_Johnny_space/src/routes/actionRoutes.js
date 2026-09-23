const express = require('express');
const actionController = require('../controllers/actionController');

const router = express.Router();

/**
 * POST /api/actions/water
 * Lancer l'arrosage
 * Body: { duration: number, isAuto: boolean }
 */
router.post('/water', actionController.startWatering);

/**
 * DELETE /api/actions/water/:id
 * Arrêter l'arrosage
 */
router.delete('/water/:id', actionController.stopWatering);

/**
 * GET /api/actions/active
 * Récupérer les actions en cours
 */
router.get('/active', actionController.getActiveActions);

/**
 * GET /api/actions/history
 * Récupérer l'historique des actions
 * Query: ?limit=50
 */
router.get('/history', actionController.getHistory);

/**
 * POST /api/actions/lighting
 * Contrôler la LED
 * Body: { state: boolean }
 */
router.post('/lighting', actionController.toggleLighting);

module.exports = router;