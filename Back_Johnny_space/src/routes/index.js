const express = require('express');
const readingRoutes = require('./readingRoutes');
const actionRoutes = require('./actionRoutes');
const alertRoutes = require('./alertRoutes');

const router = express.Router();

/**
 * Routes API
 */
router.use('/readings', readingRoutes);
router.use('/actions', actionRoutes);
router.use('/alerts', alertRoutes);

module.exports = router;