const Action = require('../models/Action');
const actionRepository = require('../repository/actionRepository');
const env = require('../config/env');

class ActionService {
    // Lancer l'arrosage
    async startWatering(duration, isAuto = false) {
        // Vérifications de sécurité
        if (isAuto) {
            const AlertService = require('./alertService');
            const blockingAlerts = await AlertService.getBlockingAlerts();
            if (blockingAlerts.length > 0) {
                throw new Error('Arrosage bloqué par une alerte critique');
            }
        }

        // R03: Max 2 minutes
        if (duration > 120) {
            throw new Error('Durée maximale: 120 secondes');
        }

        const action = new Action({
            type: 'water',
            duration,
            start_time: new Date(),
            is_auto: isAuto,
            status: 'running'
        });

        const saved = await actionRepository.createAction(action);

        // Arrêter automatiquement après `duration` secondes
        setTimeout(() => {
            this.stopWatering(saved.id);
        }, duration * 1000);

        return saved;
    }

    // Arrêter l'arrosage
    async stopWatering(actionId) {
        return await actionRepository.stopAction(actionId);
    }

    // Récupérer les actions actives
    async getActiveActions() {
        return await actionRepository.getActiveActions();
    }
}

module.exports = new ActionService();