// Schéma pour l'état du matériel

class Equipment {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || null; // 'pump', 'led', 'camera'
        this.type = data.type || null; // 'pump', 'led', 'camera'
        this.status = data.status || 'off'; // 'on', 'off', 'ready', 'error'
        this.last_checked = data.last_checked || new Date();
    }

    // Valider
    validate() {
        const errors = [];

        if (!this.name) errors.push('name is required');
        if (!this.type) errors.push('type is required');
        if (!['pump', 'led', 'camera'].includes(this.type)) {
            errors.push('type must be pump, led, or camera');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Marquer comme on/off
    turnOn() {
        this.status = 'on';
        this.last_checked = new Date();
    }

    turnOff() {
        this.status = 'off';
        this.last_checked = new Date();
    }

    // Vérifier l'état
    isOperational() {
        return ['on', 'off', 'ready'].includes(this.status);
    }

    isError() {
        return this.status === 'error';
    }

    // Pré-configurations
    static createPump() {
        return new Equipment({
            name: 'pump',
            type: 'pump',
            status: 'off'
        });
    }

    static createLED() {
        return new Equipment({
            name: 'led',
            type: 'led',
            status: 'off'
        });
    }

    static createCamera() {
        return new Equipment({
            name: 'camera',
            type: 'camera',
            status: 'ready'
        });
    }
}

module.exports = Equipment;