// src/app.js
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Routes (à ajouter plus tard)
// app.use('/api/readings', readingRoutes);
// app.use('/api/actions', actionRoutes);
// app.use('/api/alerts', alertRoutes);

// Error handler (doit être à la fin)
app.use(errorHandler);

module.exports = app;