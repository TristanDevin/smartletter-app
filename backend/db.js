const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMessages() {
  return prisma.message.findMany();
}

async function postMessage(message) {
  return prisma.message.create({
    data: {
      id: message.id,
      letter: message.letter,
      colis: message.colis,
      datetime: message.datetime,
      recupere: message.recupere,
    },
  });
}

async function putMessage(message) {
  return prisma.message.update({
    where: { id: message.id },
    data: {
      recupere: message.recupere,
    },
  });
}

module.exports = { getMessages, postMessage };
