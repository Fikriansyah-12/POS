/*
  Warnings:

  - A unique constraint covering the columns `[midtransOrderId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "midtransOrderId" TEXT,
ADD COLUMN     "midtransPaymentType" TEXT,
ADD COLUMN     "midtransRawResponse" JSONB,
ADD COLUMN     "midtransSnapToken" TEXT,
ADD COLUMN     "midtransStatus" TEXT,
ADD COLUMN     "midtransTransactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_midtransOrderId_key" ON "Sale"("midtransOrderId");
