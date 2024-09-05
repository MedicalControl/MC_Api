/*
  Warnings:

  - Added the required column `userid` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "userid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
