/**
 * JohnnySpace - Server Entry Point
 * Inclut HTTP Server + WebSocket
 */

require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const pool = require('./src/config/database');
const env = require('./src/config/env');
const { initWebSocketServer, broadcastNewReading, broadcastNewAlert, broadcastEquipmentStatus } = require('./src/websocket/server');

const PORT = process.env.PORT || 3001;

// Créer le serveur HTTP (nécessaire pour WebSocket)
const server = http.createServer(app);

// Initialiser WebSocket sur le même serveur
initWebSocketServer(server);

// Exporter les fonctions de broadcast pour les contrôleurs
global.ws = {
    broadcastNewReading,
    broadcastNewAlert,
    broadcastEquipmentStatus
};

// Tester la connexion à PostgreSQL
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error(' PostgreSQL connection failed:', err.message);
        process.exit(1);
    } else {
        console.log(' PostgreSQL connected:', result.rows[0].now);
    }
});

// Lancer le serveur
server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n Server running on http://0.0.0.0:${PORT}`);
    console.log(` WebSocket: ws://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health\n`);
});

// Gestion des erreurs
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(` Port ${PORT} est déjà utilisé`);
        process.exit(1);
    } else {
        throw error;
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n Arrêt du serveur...');
    server.close(() => {
        console.log(' Serveur arrêté');
        pool.end();
        process.exit(0);
    });
});

module.exports = server;