-- CreateTable
CREATE TABLE "tratament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "dosis" INTEGER NOT NULL,
    "Type" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tratament_pkey" PRIMARY KEY ("id")
);
