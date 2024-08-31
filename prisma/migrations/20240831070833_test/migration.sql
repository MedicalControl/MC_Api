/*
  Warnings:

  - You are about to drop the column `bloodtype` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `placebirth` on the `Test` table. All the data in the column will be lost.
  - Added the required column `bloodType` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeBirth` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "bloodtype",
DROP COLUMN "placebirth",
ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "placeBirth" TEXT NOT NULL;
