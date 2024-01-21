import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


const messages = [
    {
        senderDevice: 'A',
        numColis: 2,
        numLetter: 1,
        receivedAt: '2024-01-11T08:14:11.000Z',
        retrieved: false
    },
    {
        senderDevice: 'B',
        numColis: 1,
        numLetter: 1,
        receivedAt: '2021-05-04T14:30:00.000Z',
        retrieved: false
    }
]



async function run() {

    for (const message of messages) {
        await prisma.message.create({
            data: message
        })
    }

}
 

run()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })