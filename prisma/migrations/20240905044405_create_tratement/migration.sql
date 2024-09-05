-- CreateTable
CREATE TABLE "consultation" (
    "id" SERIAL NOT NULL,
    "reasonsConsultation" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicalRecord" (
    "id" SERIAL NOT NULL,
    "num" TEXT NOT NULL,

    CONSTRAINT "medicalRecord_pkey" PRIMARY KEY ("id")
);
