// Schéma pour les lectures de capteurs

class Reading {
    constructor(data = {}) {
        this.id = data.id ?? null;
        this.temperature = data.temperature ?? null;
        this.humidity = data.humidity ?? null;
        this.soil_humidity = data.soil_humidity ?? null;
        this.is_valid = (data.is_valid !== undefined) ? data.is_valid : true;
        this.timestamp = data.timestamp ?? new Date();
    }

    // Valider les données
    validate() {
        const errors = [];

        if (this.temperature === null) {
            errors.push('temperature is required');
        }
        if (this.humidity === null) {
            errors.push('humidity is required');
        }
        if (this.soil_humidity === null) {
            errors.push('soil_humidity is required');
        }

        if (typeof this.temperature !== 'number') {
            errors.push('temperature must be a number');
        }
        if (typeof this.humidity !== 'number') {
            errors.push('humidity must be a number');
        }
        if (typeof this.soil_humidity !== 'number') {
            errors.push('soil_humidity must be a number');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Vérifier si les données sont récentes
    isRecent() {
        const now = new Date();
        const diffMinutes = (now - this.timestamp) / (1000 * 60);
        return diffMinutes < 1; // Moins de 1 min
    }

    // Vérifier la fraîcheur
    getDataFreshness() {
        const now = new Date();
        const diffMinutes = (now - this.timestamp) / (1000 * 60);

        if (diffMinutes < 1) {
            return 'recent';
        }
        if (diffMinutes < 60) {
            return 'old';
        }
        return 'unavailable';
    }
}

module.exports = Reading;