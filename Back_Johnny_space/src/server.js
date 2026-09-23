// server.js
require('dotenv').config();
const app = require('./app');
const pool = require('./config/database');
const env = require('./config/env');

const PORT = env.PORT;

// Tester la connexion à PostgreSQL
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('❌ PostgreSQL connection failed:', err.message);
        process.exit(1);
    } else {
        console.log('✅ PostgreSQL connected:', result.rows[0]);
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});