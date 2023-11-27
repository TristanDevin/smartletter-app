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

module.exports = { getMessages, postMessage, putMessage };
