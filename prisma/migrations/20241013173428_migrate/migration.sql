/*
  Warnings:

  - A unique constraint covering the columns `[nrocedula]` on the table `paciente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "paciente_nrocedula_key" ON "paciente"("nrocedula");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");
