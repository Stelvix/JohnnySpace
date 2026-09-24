import pg from 'pg';

const client = new pg.Client({
  host: import.meta.env.VITE_DB_HOST,
  port: import.meta.env.VITE_DB_PORT,
  database: import.meta.env.VITE_DB_NAME,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD
});

export async function connectDB() {
  try {
    await client.connect();
    console.log('PostgreSQL connected');
    return client;
  } catch (error) {
    console.error('DB Connection Error:', error.message);
    throw error;
  }
}

export async function queryDB(sql, params = []) {
  const client = new pg.Client({
    host: import.meta.env.VITE_DB_HOST,
    port: import.meta.env.VITE_DB_PORT,
    database: import.meta.env.VITE_DB_NAME,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD
  });

  try {
    await client.connect();
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Query Error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}
