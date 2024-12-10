-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Draft', 'Finalized');

-- CreateEnum
CREATE TYPE "DataType" AS ENUM ('text', 'json');

-- CreateTable
CREATE TABLE "Contracts" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "data" TEXT NOT NULL,
    "dataType" "DataType" NOT NULL,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("id")
);
