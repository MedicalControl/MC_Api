/*
  Warnings:

  - Added the required column `districid` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipalityid` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "districid" INTEGER NOT NULL,
ADD COLUMN     "municipalityid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_municipalityid_fkey" FOREIGN KEY ("municipalityid") REFERENCES "municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_districid_fkey" FOREIGN KEY ("districid") REFERENCES "distric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
