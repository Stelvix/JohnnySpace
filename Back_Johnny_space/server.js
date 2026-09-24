require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const pool = require('./src/config/database');
const { initWebSocketServer, broadcastNewReading, broadcastNewAlert, broadcastEquipmentStatus } = require('./src/websocket/server');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

initWebSocketServer(server);

global.ws = { broadcastNewReading, broadcastNewAlert, broadcastEquipmentStatus };

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('PostgreSQL connected at:', result.rows[0]);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\nServer running on http://0.0.0.0:${PORT}`);
  console.log(`Socket.io: ws://10.0.3.171:${PORT}`);
  console.log(`Health check: http://10.0.3.171:${PORT}/api/health\n`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} deja utilise`);
    process.exit(1);
  }
  throw error;
});

process.on('SIGINT', () => {
  console.log('\nArret du serveur...');
  server.close(() => {
    pool.end();
    process.exit(0);
  });
});