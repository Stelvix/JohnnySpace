require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/database');
const env = require('./src/config/env');

const PORT = env.PORT;

// Test connexion PostgreSQL
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('PostgreSQL connected at:', result.rows[0]);
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`\nAPI Endpoints:`);
  console.log(`   POST   /api/readings`);
  console.log(`   GET    /api/readings/status`);
  console.log(`   GET    /api/readings/history`);
  console.log(`   GET    /api/readings/stats`);
  console.log(`   POST   /api/actions/water`);
  console.log(`   DELETE /api/actions/water/:id`);
  console.log(`   POST   /api/actions/lighting`);
  console.log(`   GET    /api/alerts\n`);
});