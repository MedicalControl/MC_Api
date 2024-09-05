/*
  Warnings:

  - You are about to drop the column `EndDate` on the `tratament` table. All the data in the column will be lost.
  - You are about to drop the column `StartDate` on the `tratament` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `tratament` table. All the data in the column will be lost.
  - Added the required column `consultationId` to the `tratament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `tratament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `tratament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tratament" DROP COLUMN "EndDate",
DROP COLUMN "StartDate",
DROP COLUMN "Type",
ADD COLUMN     "consultationId" INTEGER NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "healthunit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "num" TEXT NOT NULL,

    CONSTRAINT "healthunit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tratament" ADD CONSTRAINT "tratament_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
