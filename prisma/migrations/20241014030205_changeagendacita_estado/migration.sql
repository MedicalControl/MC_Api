/*
  Warnings:

  - You are about to drop the column `fecha` on the `agendacita` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `agendacita` table. All the data in the column will be lost.
  - Added the required column `fechahora` to the `agendacita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agendacita" DROP COLUMN "fecha",
DROP COLUMN "hora",
ADD COLUMN     "fechahora" TIMESTAMP(3) NOT NULL;
