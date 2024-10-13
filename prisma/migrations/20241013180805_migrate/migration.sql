/*
  Warnings:

  - You are about to alter the column `apellidos` on the `paciente` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "paciente" ALTER COLUMN "apellidos" SET DATA TYPE VARCHAR(50);
