const { Server } = require('socket.io');
const pool = require('../config/database');

let io = null;

function initWebSocketServer(server) {
    io = new Server(server, {
        cors: { origin: '*', methods: ['GET', 'POST'] }
    });

    io.on('connection', (socket) => {
        console.log('Client Socket.io connecte');
        sendInitialData(socket);

        socket.on('disconnect', () => {
            console.log('Client Socket.io deconnecte');
        });

        socket.on('PING', () => {
            socket.emit('PONG');
        });
    });

    return io;
}

async function sendInitialData(socket) {
    try {
        const readingResult = await pool.query(
            'SELECT * FROM readings ORDER BY timestamp DESC LIMIT 1'
        );
        const alertResult = await pool.query(
            'SELECT * FROM alerts ORDER BY created_at DESC LIMIT 5'
        );
        const equipResult = await pool.query(
            'SELECT * FROM equipment_status'
        );

        socket.emit('INITIAL_DATA', {
            lastReading: readingResult.rows[0] || null,
            alerts: alertResult.rows,
            equipment: equipResult.rows
        });
    } catch (error) {
        console.error('Erreur donnees initiales:', error);
    }
}

function broadcastNewReading(reading) {
    if (io) io.emit('NEW_READING', reading);
}

function broadcastNewAlert(alert) {
    if (io) io.emit('NEW_ALERT', alert);
}

function broadcastEquipmentStatus(equipment) {
    if (io) io.emit('EQUIPMENT_UPDATE', equipment);
}

module.exports = {
    initWebSocketServer,
    broadcastNewReading,
    broadcastNewAlert,
    broadcastEquipmentStatus
};