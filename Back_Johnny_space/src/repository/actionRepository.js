const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ActionRepository {
    // Créer une action
    async createAction(action) {
        const query = `
      INSERT INTO actions (id, type, duration, start_time, end_time, is_auto, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
        const values = [
            uuidv4(),
            action.type,
            action.duration,
            action.start_time,
            action.end_time,
            action.is_auto,
            action.status
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Récupérer les actions actives (running)
    async getActiveActions() {
        const query = "SELECT * FROM actions WHERE status = 'running' ORDER BY start_time DESC";
        const result = await pool.query(query);
        return result.rows;
    }

    // Récupérer l'historique des actions
    async getActionHistory(limit = 50) {
        const query = 'SELECT * FROM actions ORDER BY start_time DESC LIMIT $1';
        const result = await pool.query(query, [limit]);
        return result.rows;
    }

    // Mettre à jour le statut d'une action
    async updateActionStatus(actionId, status) {
        const query = 'UPDATE actions SET status = $1, end_time = NOW() WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [status, actionId]);
        return result.rows[0];
    }

    // Arrêter une action en cours
    async stopAction(actionId) {
        const query = `
      UPDATE actions 
      SET status = 'stopped', end_time = NOW() 
      WHERE id = $1 AND status = 'running'
      RETURNING *
    `;
        const result = await pool.query(query, [actionId]);
        return result.rows[0];
    }

    // Supprimer une action
    async deleteAction(actionId) {
        const query = 'DELETE FROM actions WHERE id = $1';
        const result = await pool.query(query, [actionId]);
        return result.rowCount > 0;
    }
}

module.exports = new ActionRepository();