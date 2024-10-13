-- CreateTable
CREATE TABLE "administrador" (
    "pk_administrador" INTEGER NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "fk_usuario" INTEGER NOT NULL,

    CONSTRAINT "administrador_pk" PRIMARY KEY ("pk_administrador")
);

-- CreateTable
CREATE TABLE "agendacita" (
    "pk_agendacita" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "hora" TIME(6) NOT NULL,
    "estado" VARCHAR(10) NOT NULL,
    "fk_paciente" INTEGER NOT NULL,
    "fk_doctor" INTEGER NOT NULL,

    CONSTRAINT "agendacita_pkey" PRIMARY KEY ("pk_agendacita")
);

-- CreateTable
CREATE TABLE "cita" (
    "pk_cita" SERIAL NOT NULL,
    "motivo" TEXT NOT NULL,
    "sintomas" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "indicaciones" TEXT NOT NULL,
    "fk_agendacita" INTEGER NOT NULL,
    "fk_expediente" INTEGER NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("pk_cita")
);

-- CreateTable
CREATE TABLE "departamento" (
    "pk_departamento" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("pk_departamento")
);

-- CreateTable
CREATE TABLE "doctor" (
    "pk_doctor" SERIAL NOT NULL,
    "nombres" VARCHAR(50) NOT NULL,
    "fk_especialidad" INTEGER NOT NULL,
    "apellidos" VARCHAR(30) NOT NULL,
    "direccion" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(10) NOT NULL,
    "fk_usuario" INTEGER NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("pk_doctor")
);

-- CreateTable
CREATE TABLE "especialidad" (
    "pk_especialidad" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,

    CONSTRAINT "especialidad_pkey" PRIMARY KEY ("pk_especialidad")
);

-- CreateTable
CREATE TABLE "examenheces" (
    "pk_examenheces" INTEGER NOT NULL,
    "resultado" TEXT NOT NULL,
    "fk_ordenexamen" INTEGER NOT NULL,
    "fk_laboratorio" INTEGER NOT NULL,

    CONSTRAINT "examenheces_pk" PRIMARY KEY ("pk_examenheces")
);

-- CreateTable
CREATE TABLE "examenorina" (
    "pk_examenorina" INTEGER NOT NULL,
    "resultado" TEXT NOT NULL,
    "fk_ordenexamen" INTEGER NOT NULL,
    "fk_laboratorio" INTEGER NOT NULL,

    CONSTRAINT "examenorina_pk" PRIMARY KEY ("pk_examenorina")
);

-- CreateTable
CREATE TABLE "examensangre" (
    "resultado" TEXT NOT NULL,
    "fk_ordenexamen" INTEGER NOT NULL,
    "fk_laboratorio" INTEGER NOT NULL,
    "pk_examensangre" INTEGER NOT NULL,

    CONSTRAINT "examensangre_pk" PRIMARY KEY ("pk_examensangre")
);

-- CreateTable
CREATE TABLE "expediente" (
    "pk_expediente" SERIAL NOT NULL,
    "fk_paciente" INTEGER NOT NULL,
    "nroexpediente" VARCHAR NOT NULL,

    CONSTRAINT "expediente_pkey" PRIMARY KEY ("pk_expediente")
);

-- CreateTable
CREATE TABLE "laboratorio" (
    "pk_laboratorio" INTEGER NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "laboratorio_pk" PRIMARY KEY ("pk_laboratorio")
);

-- CreateTable
CREATE TABLE "medicamento" (
    "pk_medicamento" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fk_tipomedicamento" INTEGER NOT NULL,

    CONSTRAINT "medicamento_pkey" PRIMARY KEY ("pk_medicamento")
);

-- CreateTable
CREATE TABLE "municipio" (
    "pk_municipio" SERIAL NOT NULL,
    "fk_departamento" INTEGER NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("pk_municipio")
);

-- CreateTable
CREATE TABLE "ordenexamen" (
    "pk_ordenexamen" SERIAL NOT NULL,
    "fk_tipoexamen" INTEGER NOT NULL,
    "estado" VARCHAR(10) NOT NULL,
    "fk_ordenlaboratorio" INTEGER NOT NULL,

    CONSTRAINT "ordenexamen_pkey" PRIMARY KEY ("pk_ordenexamen")
);

-- CreateTable
CREATE TABLE "ordenlaboratorio" (
    "fk_cita" INTEGER NOT NULL,
    "pk_ordenlaboratorio" INTEGER NOT NULL,

    CONSTRAINT "ordenlaboratorio_pk" PRIMARY KEY ("pk_ordenlaboratorio")
);

-- CreateTable
CREATE TABLE "paciente" (
    "pk_paciente" SERIAL NOT NULL,
    "nombres" VARCHAR(50) NOT NULL,
    "direccion" VARCHAR(100),
    "telefono" VARCHAR(15),
    "fechanacimiento" DATE NOT NULL,
    "sexo" BOOLEAN NOT NULL,
    "estadocivil" VARCHAR(20) NOT NULL,
    "ocupacion" VARCHAR(20) NOT NULL,
    "escolaridad" VARCHAR(20) NOT NULL,
    "apellidos" VARCHAR NOT NULL,
    "religion" VARCHAR(20) NOT NULL,
    "nombrepad" VARCHAR(50),
    "nombremad" VARCHAR(50),
    "fk_municipio" INTEGER NOT NULL,
    "nrocedula" VARCHAR(30) NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("pk_paciente")
);

-- CreateTable
CREATE TABLE "pacienteusuario" (
    "pk_pacienteusuario" INTEGER NOT NULL,
    "fk_paciente" INTEGER NOT NULL,
    "fk_usuario" INTEGER NOT NULL,

    CONSTRAINT "pacienteusuario_pk" PRIMARY KEY ("pk_pacienteusuario")
);

-- CreateTable
CREATE TABLE "recetamedica" (
    "pk_recetamedica" INTEGER NOT NULL,
    "fk_cita" INTEGER NOT NULL,

    CONSTRAINT "recetamedica_pk" PRIMARY KEY ("pk_recetamedica")
);

-- CreateTable
CREATE TABLE "recetatratamiento" (
    "pk_recetatratamiento" SERIAL NOT NULL,
    "cantidad" SMALLINT NOT NULL,
    "fk_medicamento" INTEGER NOT NULL,
    "fk_recetamedica" INTEGER NOT NULL,
    "frecuencia" VARCHAR(30) NOT NULL,

    CONSTRAINT "recetatratamiento_pkey" PRIMARY KEY ("pk_recetatratamiento")
);

-- CreateTable
CREATE TABLE "rol" (
    "pk_rol" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("pk_rol")
);

-- CreateTable
CREATE TABLE "tipoexamen" (
    "pk_tipoexamen" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "tipoexamen_pkey" PRIMARY KEY ("pk_tipoexamen")
);

-- CreateTable
CREATE TABLE "tipomedicamento" (
    "pk_tipomedicamento" INTEGER NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,

    CONSTRAINT "tipomedicamento_pk" PRIMARY KEY ("pk_tipomedicamento")
);

-- CreateTable
CREATE TABLE "usuario" (
    "contraseña" VARCHAR(20) NOT NULL,
    "fk_rol" INTEGER NOT NULL,
    "pk_usuario" INTEGER NOT NULL,
    "correo" VARCHAR(30) NOT NULL,

    CONSTRAINT "usuario_pk" PRIMARY KEY ("pk_usuario")
);

-- AddForeignKey
ALTER TABLE "administrador" ADD CONSTRAINT "administrador_usuario_fk" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("pk_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendacita" ADD CONSTRAINT "agendacita_fk_doctor_fkey" FOREIGN KEY ("fk_doctor") REFERENCES "doctor"("pk_doctor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendacita" ADD CONSTRAINT "agendacita_fk_paciente_fkey" FOREIGN KEY ("fk_paciente") REFERENCES "paciente"("pk_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_agendacita_fk" FOREIGN KEY ("fk_agendacita") REFERENCES "agendacita"("pk_agendacita") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_expediente_fk" FOREIGN KEY ("fk_expediente") REFERENCES "expediente"("pk_expediente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_fk_especialidad_fkey" FOREIGN KEY ("fk_especialidad") REFERENCES "especialidad"("pk_especialidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_usuario_fk" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("pk_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "examenheces" ADD CONSTRAINT "examenheces_laboratorio_fk" FOREIGN KEY ("fk_laboratorio") REFERENCES "laboratorio"("pk_laboratorio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "examenheces" ADD CONSTRAINT "examenheces_ordenexamen_fk" FOREIGN KEY ("fk_ordenexamen") REFERENCES "ordenexamen"("pk_ordenexamen") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "examenorina" ADD CONSTRAINT "examenorina_laboratorio_fk" FOREIGN KEY ("fk_laboratorio") REFERENCES "laboratorio"("pk_laboratorio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "examenorina" ADD CONSTRAINT "examenorina_ordenexamen_fk" FOREIGN KEY ("fk_ordenexamen") REFERENCES "ordenexamen"("pk_ordenexamen") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "examensangre" ADD CONSTRAINT "examensangre_laboratorio_fk" FOREIGN KEY ("fk_laboratorio") REFERENCES "laboratorio"("pk_laboratorio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "examensangre" ADD CONSTRAINT "examensangre_ordenexamen_fk" FOREIGN KEY ("fk_ordenexamen") REFERENCES "ordenexamen"("pk_ordenexamen") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expediente" ADD CONSTRAINT "expediente_fk_paciente_fkey" FOREIGN KEY ("fk_paciente") REFERENCES "paciente"("pk_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medicamento" ADD CONSTRAINT "medicamento_tipomedicamento_fk" FOREIGN KEY ("fk_tipomedicamento") REFERENCES "tipomedicamento"("pk_tipomedicamento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_fk_departamento_fkey" FOREIGN KEY ("fk_departamento") REFERENCES "departamento"("pk_departamento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenexamen" ADD CONSTRAINT "ordenexamen_fk_tipoexamen_fkey" FOREIGN KEY ("fk_tipoexamen") REFERENCES "tipoexamen"("pk_tipoexamen") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenexamen" ADD CONSTRAINT "ordenexamen_ordenlaboratorio_fk" FOREIGN KEY ("fk_ordenlaboratorio") REFERENCES "ordenlaboratorio"("pk_ordenlaboratorio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenlaboratorio" ADD CONSTRAINT "ordenlaboratorio_cita_fk" FOREIGN KEY ("fk_cita") REFERENCES "cita"("pk_cita") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paciente" ADD CONSTRAINT "paciente_municipio_fk" FOREIGN KEY ("fk_municipio") REFERENCES "municipio"("pk_municipio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacienteusuario" ADD CONSTRAINT "pacienteusuario_paciente_fk" FOREIGN KEY ("fk_paciente") REFERENCES "paciente"("pk_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacienteusuario" ADD CONSTRAINT "pacienteusuario_usuario_fk" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("pk_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recetamedica" ADD CONSTRAINT "recetamedica_cita_fk" FOREIGN KEY ("fk_cita") REFERENCES "cita"("pk_cita") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recetatratamiento" ADD CONSTRAINT "recetatratamiento_fk_medicamento_fkey" FOREIGN KEY ("fk_medicamento") REFERENCES "medicamento"("pk_medicamento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recetatratamiento" ADD CONSTRAINT "recetatratamiento_recetamedica_fk" FOREIGN KEY ("fk_recetamedica") REFERENCES "recetamedica"("pk_recetamedica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_fk_rol_fkey" FOREIGN KEY ("fk_rol") REFERENCES "rol"("pk_rol") ON DELETE NO ACTION ON UPDATE NO ACTION;
