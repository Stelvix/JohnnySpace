const Alert = require('../models/Alert');
const alertRepository = require('../repository/alertRepository');

class AlertService {
    // Créer une alerte
    async createAlert(alertData) {
        const alert = new Alert(alertData);

        const validation = alert.validate();
        if (!validation.isValid) {
            throw new Error(`Alerte invalide: ${validation.errors.join(', ')}`);
        }

        return await alertRepository.createAlert(alert);
    }

    // Récupérer les alertes qui bloquent l'arrosage
    async getBlockingAlerts() {
        return await alertRepository.getBlockingAlerts();
    }

    // Récupérer les alertes non lues
    async getUnacknowledgedAlerts() {
        return await alertRepository.getUnacknowledgedAlerts();
    }

    // Marquer une alerte comme lue
    async acknowledgeAlert(alertId) {
        return await alertRepository.acknowledgeAlert(alertId);
    }
}

module.exports = new AlertService();