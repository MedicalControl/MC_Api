/*
  Warnings:

  - A unique constraint covering the columns `[identityCard]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodtype` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityCard` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placebirth` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profeession` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bloodtype" TEXT NOT NULL,
ADD COLUMN     "identityCard" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "placebirth" TEXT NOT NULL,
ADD COLUMN     "proffession" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Test_identityCard_key" ON "Test"("identityCard");
