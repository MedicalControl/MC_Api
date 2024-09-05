/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `medical` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientid]` on the table `medicalRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientid` to the `medicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicalRecord" ADD COLUMN     "patientid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "medical_userid_key" ON "medical"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "medicalRecord_patientid_key" ON "medicalRecord"("patientid");

-- CreateIndex
CREATE UNIQUE INDEX "patient_userid_key" ON "patient"("userid");

-- AddForeignKey
ALTER TABLE "medicalRecord" ADD CONSTRAINT "medicalRecord_patientid_fkey" FOREIGN KEY ("patientid") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
