const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class EquipmentRepository {
    // Créer un équipement
    async createEquipment(equipment) {
        const query = `
      INSERT INTO equipment_status (id, name, type, status, last_checked)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
        const values = [
            uuidv4(),
            equipment.name,
            equipment.type,
            equipment.status,
            equipment.last_checked
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Récupérer un équipement par nom
    async getEquipmentByName(name) {
        const query = 'SELECT * FROM equipment_status WHERE name = $1';
        const result = await pool.query(query, [name]);
        return result.rows[0];
    }

    // Récupérer tous les équipements
    async getAllEquipment() {
        const query = 'SELECT * FROM equipment_status ORDER BY name';
        const result = await pool.query(query);
        return result.rows;
    }

    // Mettre à jour le statut d'un équipement
    async updateEquipmentStatus(equipmentName, status) {
        const query = `
      UPDATE equipment_status 
      SET status = $1, last_checked = NOW() 
      WHERE name = $2 
      RETURNING *
    `;
        const result = await pool.query(query, [status, equipmentName]);
        return result.rows[0];
    }

    // Vérifier l'état de la pompe
    async getPumpStatus() {
        return await this.getEquipmentByName('pump');
    }

    // Vérifier l'état de la LED
    async getLEDStatus() {
        return await this.getEquipmentByName('led');
    }

    // Vérifier l'état de la caméra
    async getCameraStatus() {
        return await this.getEquipmentByName('camera');
    }
}

module.exports = new EquipmentRepository();