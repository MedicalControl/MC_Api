/*
  Warnings:

  - Added the required column `medicalRecordid` to the `consultation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consultation" ADD COLUMN     "medicalRecordid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_medicalRecordid_fkey" FOREIGN KEY ("medicalRecordid") REFERENCES "medicalRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
