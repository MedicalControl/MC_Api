/*
  Warnings:

  - The `estado` column on the `agendacita` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "estado" AS ENUM ('Pendiente', 'Cancelado', 'Realizado', 'Revision');

-- AlterTable
ALTER TABLE "agendacita" DROP COLUMN "estado",
ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'Revision';
