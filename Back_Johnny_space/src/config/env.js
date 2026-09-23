// src/config/env.js
require('dotenv').config();

module.exports = {
    // Server
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || 'JohnnySpace',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',

    // Thresholds
    SOIL_DRY: parseInt(process.env.SOIL_DRY) || 30,
    SOIL_WET: parseInt(process.env.SOIL_WET) || 70,
    TEMP_MIN: parseInt(process.env.TEMP_MIN) || 15,
    TEMP_MAX: parseInt(process.env.TEMP_MAX) || 30,
    HUMIDITY_MIN: parseInt(process.env.HUMIDITY_MIN) || 40,
    HUMIDITY_MAX: parseInt(process.env.HUMIDITY_MAX) || 80
};