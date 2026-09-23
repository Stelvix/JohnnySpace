const alertService = require('../services/alertService');
const alertRepository = require('../repository/alertRepository');

class AlertController {
    // GET /api/alerts - Récupérer les alertes récentes
    async getAlerts(req, res, next) {
        try {
            const limit = req.query.limit || 20;
            const alerts = await alertRepository.getRecentAlerts(limit);

            res.json({
                count: alerts.length,
                data: alerts
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/alerts/unacknowledged - Alertes non lues
    async getUnacknowledged(req, res, next) {
        try {
            const alerts = await alertService.getUnacknowledgedAlerts();

            res.json({
                count: alerts.length,
                data: alerts
            });
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/alerts/:id/acknowledge - Marquer une alerte comme lue
    async acknowledgeAlert(req, res, next) {
        try {
            const { id } = req.params;

            const alert = await alertService.acknowledgeAlert(id);

            if (!alert) {
                return res.status(404).json({
                    error: 'Alerte non trouvée',
                    status: 404
                });
            }

            res.json({
                message: 'Alerte marquée comme lue',
                data: alert
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/alerts/blocking - Alertes qui bloquent l'arrosage automatique
    async getBlockingAlerts(req, res, next) {
        try {
            const alerts = await alertService.getBlockingAlerts();

            res.json({
                count: alerts.length,
                autoWateringBlocked: alerts.length > 0,
                data: alerts
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AlertController();