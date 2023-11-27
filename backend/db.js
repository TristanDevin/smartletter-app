<<<<<<< HEAD
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMessages() {
  return prisma.message.findMany();
}

async function postMessage(message) {
  return prisma.message.create({
    data: {
      senderDevice: message.senderDevice,
      numLetter: message.numLetter,
      numColis: message.numColis,
      receivedAt: message.receivedAt,
      retrieved: message.retrieved,
    },
  });
}

async function putMessage(message) {
  return prisma.message.update({
    where: { id: message.id },
    data: {
      retrieved: message.retrieved,
    },
  });
}

module.exports = { getMessages, postMessage };
=======
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
>>>>>>> 31326cd9a969e11594653d5050510b485fa2e3df
