const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ReadingRepository {
    // Créer une lecture
    async createReading(reading) {
        const query = `
      INSERT INTO readings (id, temperature, humidity, soil_humidity, is_valid, timestamp)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        const values = [
            uuidv4(),
            reading.temperature,
            reading.humidity,
            reading.soil_humidity,
            reading.is_valid,
            reading.timestamp
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Récupérer la dernière lecture
    async getLatestReading() {
        const query = 'SELECT * FROM readings ORDER BY timestamp DESC LIMIT 1';
        const result = await pool.query(query);
        return result.rows[0];
    }

    // Récupérer l'historique (24h)
    async getReadingHistory(hours = 24) {
        const query = `
      SELECT * FROM readings 
      WHERE timestamp > NOW() - INTERVAL '${hours} hours'
      ORDER BY timestamp DESC
    `;
        const result = await pool.query(query);
        return result.rows;
    }

    // Récupérer les stats (min/max/avg)
    async getReadingStats(hours = 24) {
        const query = `
      SELECT 
        MIN(temperature) as temp_min,
        MAX(temperature) as temp_max,
        AVG(temperature) as temp_avg,
        MIN(humidity) as humidity_min,
        MAX(humidity) as humidity_max,
        AVG(humidity) as humidity_avg,
        MIN(soil_humidity) as soil_min,
        MAX(soil_humidity) as soil_max,
        AVG(soil_humidity) as soil_avg
      FROM readings 
      WHERE timestamp > NOW() - INTERVAL '${hours} hours'
    `;
        const result = await pool.query(query);
        return result.rows[0];
    }

    // Supprimer les anciennes lectures (cleanup)
    async deleteOldReadings(days = 7) {
        const query = `
      DELETE FROM readings 
      WHERE timestamp < NOW() - INTERVAL '${days} days'
    `;
        const result = await pool.query(query);
        return result.rowCount;
    }
}

module.exports = new ReadingRepository();