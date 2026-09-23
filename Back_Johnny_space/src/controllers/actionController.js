const actionService = require('../services/actionService');
const actionRepository = require('../repository/actionRepository');

class ActionController {
    // POST /api/actions/water - Lancer l'arrosage
    async startWatering(req, res, next) {
        try {
            const { duration, isAuto } = req.body;

            // Valider
            if (!duration) {
                return res.status(400).json({
                    error: 'duration est requis (en secondes)',
                    status: 400
                });
            }

            if (duration < 1 || duration > 120) {
                return res.status(400).json({
                    error: 'duration doit être entre 1 et 120 secondes',
                    status: 400
                });
            }

            const action = await actionService.startWatering(
                duration,
                isAuto || false
            );

            res.status(201).json({
                message: 'Arrosage lancé',
                data: action
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/actions/water/:id - Arrêter l'arrosage
    async stopWatering(req, res, next) {
        try {
            const { id } = req.params;

            const action = await actionService.stopWatering(id);

            if (!action) {
                return res.status(404).json({
                    error: 'Action non trouvée',
                    status: 404
                });
            }

            res.json({
                message: 'Arrosage arrêté',
                data: action
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/actions/active - Actions en cours
    async getActiveActions(req, res, next) {
        try {
            const actions = await actionService.getActiveActions();

            res.json({
                count: actions.length,
                data: actions
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/actions/history - Historique des actions
    async getHistory(req, res, next) {
        try {
            const limit = req.query.limit || 50;
            const history = await actionRepository.getActionHistory(limit);

            res.json({
                count: history.length,
                data: history
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/actions/lighting - Contrôler la LED
    async toggleLighting(req, res, next) {
        try {
            const { state } = req.body;

            if (state === undefined) {
                return res.status(400).json({
                    error: 'state est requis (true/false)',
                    status: 400
                });
            }

            const action = await actionRepository.createAction({
                type: 'light',
                start_time: new Date(),
                is_auto: false,
                status: state ? 'running' : 'completed'
            });

            res.status(201).json({
                message: `LED ${state ? 'allumée' : 'éteinte'}`,
                data: action
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ActionController();