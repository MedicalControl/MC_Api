-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "idCard" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "inssnumber" TEXT NOT NULL,
    "ocupation" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "sex" BOOLEAN NOT NULL,
    "number" TEXT NOT NULL,
    "bloodType" VARCHAR(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "districid" INTEGER NOT NULL,

    CONSTRAINT "municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distric" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "distric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_idCard_key" ON "patient"("idCard");

-- AddForeignKey
ALTER TABLE "municipality" ADD CONSTRAINT "municipality_districid_fkey" FOREIGN KEY ("districid") REFERENCES "distric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
