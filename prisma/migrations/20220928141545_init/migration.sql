-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animals" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "breed" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Animals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_cpf_key" ON "Clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Animals_clientId_key" ON "Animals"("clientId");

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
