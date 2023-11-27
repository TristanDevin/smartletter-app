-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderDevice" TEXT NOT NULL DEFAULT '',
    "numColis" INTEGER NOT NULL DEFAULT 0,
    "numLetter" INTEGER NOT NULL DEFAULT 0,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retrieved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");
