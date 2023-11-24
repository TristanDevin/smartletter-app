const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env



const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

async function getMessages() {
  return pool.query('SELECT * FROM "Message"; ');
}

module.exports = { getMessages };
