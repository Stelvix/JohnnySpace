// Schéma pour les actions (arrosage, LED)

class Action {
    constructor(data = {}) {
        this.id = data.id || null;
        this.type = data.type || null; // 'water' ou 'light'
        this.duration = data.duration || null; // en secondes
        this.start_time = data.start_time || new Date();
        this.end_time = data.end_time || null;
        this.is_auto = data.is_auto || false; // automatique ou manuel
        this.status = data.status || 'pending'; // pending, running, completed, stopped
    }

    // Valider
    validate() {
        const errors = [];

        if (!this.type) errors.push('type is required (water or light)');
        if (!['water', 'light'].includes(this.type)) errors.push('type must be "water" or "light"');

        if (this.type === 'water' && !this.duration) {
            errors.push('duration is required for water action');
        }

        if (this.type === 'water' && this.duration > 120) {
            errors.push('water duration cannot exceed 120 seconds (2 minutes)');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Vérifier si l'action est en cours
    isRunning() {
        return this.status === 'running';
    }

    // Calculer la durée réelle
    getElapsedTime() {
        const end = this.end_time || new Date();
        return (end - this.start_time) / 1000; // en secondes
    }

    // Arrêter l'action
    stop() {
        this.end_time = new Date();
        this.status = 'stopped';
    }

    // Compléter l'action
    complete() {
        this.end_time = new Date();
        this.status = 'completed';
    }
}

module.exports = Action;