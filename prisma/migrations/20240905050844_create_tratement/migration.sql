/*
  Warnings:

  - Added the required column `healthunitid` to the `medicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicalRecord" ADD COLUMN     "healthunitid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "medical" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "healthunitid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "specialityid" INTEGER NOT NULL,

    CONSTRAINT "medical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "speciality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medicalRecord" ADD CONSTRAINT "medicalRecord_healthunitid_fkey" FOREIGN KEY ("healthunitid") REFERENCES "healthunit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical" ADD CONSTRAINT "medical_healthunitid_fkey" FOREIGN KEY ("healthunitid") REFERENCES "healthunit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical" ADD CONSTRAINT "medical_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical" ADD CONSTRAINT "medical_specialityid_fkey" FOREIGN KEY ("specialityid") REFERENCES "speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
