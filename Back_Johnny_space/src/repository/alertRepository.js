const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class AlertRepository {
    // Créer une alerte
    async createAlert(alert) {
        const query = `
      INSERT INTO alerts (id, type, severity, message, reading_id, block_auto_watering, acknowledged, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
        const values = [
            uuidv4(),
            alert.type,
            alert.severity,
            alert.message,
            alert.reading_id,
            alert.block_auto_watering,
            alert.acknowledged,
            alert.created_at
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Récupérer les alertes récentes
    async getRecentAlerts(limit = 20) {
        const query = 'SELECT * FROM alerts ORDER BY created_at DESC LIMIT $1';
        const result = await pool.query(query, [limit]);
        return result.rows;
    }

    // Récupérer les alertes non lues
    async getUnacknowledgedAlerts() {
        const query = 'SELECT * FROM alerts WHERE acknowledged = false ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    }

    // Marquer une alerte comme lue
    async acknowledgeAlert(alertId) {
        const query = 'UPDATE alerts SET acknowledged = true WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [alertId]);
        return result.rows[0];
    }

    // Récupérer les alertes qui bloquent l'arrosage automatique
    async getBlockingAlerts() {
        const query = `
      SELECT * FROM alerts 
      WHERE block_auto_watering = true AND acknowledged = false
      ORDER BY created_at DESC
    `;
        const result = await pool.query(query);
        return result.rows;
    }

    // Supprimer les alertes anciennes
    async deleteOldAlerts(days = 30) {
        const query = `
      DELETE FROM alerts 
      WHERE created_at < NOW() - INTERVAL '${days} days'
    `;
        const result = await pool.query(query);
        return result.rowCount;
    }
}

module.exports = new AlertRepository();