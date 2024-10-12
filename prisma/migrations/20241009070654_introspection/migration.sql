/*
  Warnings:

  - You are about to drop the `consultation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `distric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `healthunit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicalRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `speciality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tratament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "consultation" DROP CONSTRAINT "consultation_medicalRecordid_fkey";

-- DropForeignKey
ALTER TABLE "medical" DROP CONSTRAINT "medical_healthunitid_fkey";

-- DropForeignKey
ALTER TABLE "medical" DROP CONSTRAINT "medical_specialityid_fkey";

-- DropForeignKey
ALTER TABLE "medical" DROP CONSTRAINT "medical_userid_fkey";

-- DropForeignKey
ALTER TABLE "medicalRecord" DROP CONSTRAINT "medicalRecord_healthunitid_fkey";

-- DropForeignKey
ALTER TABLE "medicalRecord" DROP CONSTRAINT "medicalRecord_patientid_fkey";

-- DropForeignKey
ALTER TABLE "municipality" DROP CONSTRAINT "municipality_districid_fkey";

-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_districid_fkey";

-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_municipalityid_fkey";

-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_userid_fkey";

-- DropForeignKey
ALTER TABLE "tratament" DROP CONSTRAINT "tratament_consultationId_fkey";

-- DropTable
DROP TABLE "consultation";

-- DropTable
DROP TABLE "distric";

-- DropTable
DROP TABLE "healthunit";

-- DropTable
DROP TABLE "medical";

-- DropTable
DROP TABLE "medicalRecord";

-- DropTable
DROP TABLE "municipality";

-- DropTable
DROP TABLE "patient";

-- DropTable
DROP TABLE "speciality";

-- DropTable
DROP TABLE "tratament";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "citas" (
    "idcitas" SERIAL NOT NULL,
    "fechacita" DATE NOT NULL,
    "idconsulta" INTEGER NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("idcitas")
);

-- CreateTable
CREATE TABLE "consulta" (
    "idconsulta" SERIAL NOT NULL,
    "idexpediente" INTEGER NOT NULL,
    "idmedico" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "motivoconsulta" VARCHAR NOT NULL,
    "historiaenfernedad" VARCHAR NOT NULL,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("idconsulta")
);

-- CreateTable
CREATE TABLE "consultasignovitales" (
    "idconsultasignovital" SERIAL NOT NULL,
    "idconsulta" INTEGER NOT NULL,
    "idpacientesignovital" INTEGER NOT NULL,

    CONSTRAINT "consultasignovitales_pkey" PRIMARY KEY ("idconsultasignovital")
);

-- CreateTable
CREATE TABLE "departamento" (
    "iddepartamento" SERIAL NOT NULL,
    "nombredepartamento" VARCHAR(15) NOT NULL,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("iddepartamento")
);

-- CreateTable
CREATE TABLE "dosis" (
    "iddosis" SERIAL NOT NULL,
    "numerodosis" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "idvacuna" INTEGER NOT NULL,
    "idunidadsalud" INTEGER NOT NULL,
    "idmedico" INTEGER NOT NULL,
    "idexpediente" INTEGER NOT NULL,

    CONSTRAINT "dosis_pkey" PRIMARY KEY ("iddosis")
);

-- CreateTable
CREATE TABLE "emergencia" (
    "idemergencia" SERIAL NOT NULL,
    "vehiculomotorizado" INTEGER,
    "otrotransporte" INTEGER,
    "caida" INTEGER,
    "maquinaria" INTEGER,
    "efectostardios" INTEGER,
    "fenomenonatural" INTEGER,
    "asaltoagrecion" INTEGER,
    "intentosuicidio" INTEGER,
    "incendioexplosion" INTEGER,
    "otra" INTEGER,
    "trabajo" INTEGER,
    "vivienda" INTEGER,
    "centroestudio" INTEGER,
    "centromedico" INTEGER,
    "viapublica" INTEGER,
    "deportedive" INTEGER,
    "otrolugar" INTEGER,
    "desconocido" INTEGER,
    "fecha" DATE,
    "hora" TIME(6),
    "resumenclinico" VARCHAR(100),
    "examenfisico" VARCHAR(100),
    "diagnostico" VARCHAR(100),
    "planes" VARCHAR(100),
    "medica" INTEGER,
    "quirurgica" INTEGER,
    "ginecoobstetrica" INTEGER,
    "otraurgencia" INTEGER,
    "alta" INTEGER,
    "facellio" INTEGER,
    "abandono" INTEGER,
    "idexpediente" INTEGER NOT NULL,
    "idmedico" INTEGER NOT NULL,

    CONSTRAINT "emergencia_pkey" PRIMARY KEY ("idemergencia")
);

-- CreateTable
CREATE TABLE "enfermedad" (
    "idenfermedad" SERIAL NOT NULL,
    "idtipoenfermedad" INTEGER NOT NULL,
    "nombreenfermedad" VARCHAR(50) NOT NULL,

    CONSTRAINT "enfermedad_pkey" PRIMARY KEY ("idenfermedad")
);

-- CreateTable
CREATE TABLE "especialidad" (
    "idespecialidad" SERIAL NOT NULL,
    "nombreespecialidad" VARCHAR(50) NOT NULL,

    CONSTRAINT "especialidad_pkey" PRIMARY KEY ("idespecialidad")
);

-- CreateTable
CREATE TABLE "examen" (
    "idexamen" SERIAL NOT NULL,
    "nombreexamen" VARCHAR(50) NOT NULL,

    CONSTRAINT "examen_pkey" PRIMARY KEY ("idexamen")
);

-- CreateTable
CREATE TABLE "expediente" (
    "idexpediente" SERIAL NOT NULL,
    "numeroexpediente" VARCHAR(25) NOT NULL,
    "idpaciente" INTEGER NOT NULL,
    "idunidadsalud" INTEGER NOT NULL,

    CONSTRAINT "expediente_pkey" PRIMARY KEY ("idexpediente")
);

-- CreateTable
CREATE TABLE "historiaclinicaenfermedad" (
    "idhistoriaclinicaenfermedad" SERIAL NOT NULL,
    "idhistoriaclinica" INTEGER NOT NULL,
    "idenfermedad" INTEGER NOT NULL,

    CONSTRAINT "historiaclinicaenfermedad_pkey" PRIMARY KEY ("idhistoriaclinicaenfermedad")
);

-- CreateTable
CREATE TABLE "historialclinico" (
    "idhistorialclinico" SERIAL NOT NULL,
    "motivoconsulta" VARCHAR(50),
    "horassueño" INTEGER,
    "actividadfisica" VARCHAR(50),
    "alimentacion" VARCHAR(50),
    "tabaco" VARCHAR(50),
    "alcohol" VARCHAR(50),
    "drogas" VARCHAR(50),
    "farmacos" VARCHAR(50),
    "historiaenfermedadactual" VARCHAR(50),
    "enfermedadesinfectocontagiosasprevias" VARCHAR(100),
    "enfermedadescronicas" VARCHAR(100),
    "cirugiaspreviasrealizadas" VARCHAR(100),
    "hospitalizaciones" VARCHAR(50),
    "aspectogeneral" VARCHAR(150),
    "pielymucosas" VARCHAR(150),
    "cabezaycuello" VARCHAR(300),
    "torax" VARCHAR(300),
    "idexpediente" INTEGER NOT NULL,

    CONSTRAINT "historialclinico_pkey" PRIMARY KEY ("idhistorialclinico")
);

-- CreateTable
CREATE TABLE "hojaevolucion" (
    "idevolucion" INTEGER NOT NULL,
    "idconsulta" INTEGER NOT NULL,
    "idcita" INTEGER NOT NULL,
    "problemasevolucion" VARCHAR NOT NULL,
    "planes" VARCHAR,

    CONSTRAINT "hojaevolucion_pk" PRIMARY KEY ("idevolucion")
);

-- CreateTable
CREATE TABLE "horario" (
    "idhorario" SERIAL NOT NULL,
    "horarioinicio" TIME(6),
    "horariosalida" TIME(6),
    "dia" TIME(6),
    "idunidadsalud" INTEGER NOT NULL,

    CONSTRAINT "horario_pkey" PRIMARY KEY ("idhorario")
);

-- CreateTable
CREATE TABLE "medico" (
    "idmedico" SERIAL NOT NULL,
    "idusuario" INTEGER NOT NULL,
    "idespecialidad" INTEGER,
    "nombre" VARCHAR(50),
    "apellido" VARCHAR(50),
    "idunidadsalud" INTEGER NOT NULL,

    CONSTRAINT "medico_pkey" PRIMARY KEY ("idmedico")
);

-- CreateTable
CREATE TABLE "municipio" (
    "idmunicipio" SERIAL NOT NULL,
    "iddepartamento" INTEGER NOT NULL,
    "nombremunicipio" VARCHAR(15) NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("idmunicipio")
);

-- CreateTable
CREATE TABLE "nombretratamiento" (
    "idtipotratamiento" INTEGER NOT NULL,
    "idnombretratamiento" INTEGER NOT NULL,
    "descripcion" VARCHAR,

    CONSTRAINT "nombretratamiento_pk" PRIMARY KEY ("idnombretratamiento")
);

-- CreateTable
CREATE TABLE "ordenexamen" (
    "idordenexamen" SERIAL NOT NULL,
    "idexamen" INTEGER NOT NULL,
    "resultadoexamen" VARCHAR(300),
    "estado" BOOLEAN NOT NULL DEFAULT false,
    "idconsulta" INTEGER NOT NULL,

    CONSTRAINT "ordenexamen_pkey" PRIMARY KEY ("idordenexamen")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "idpaciente" SERIAL NOT NULL,
    "idmunicipio" INTEGER NOT NULL,
    "cedula" VARCHAR(16) NOT NULL,
    "nombres" VARCHAR(50) NOT NULL,
    "apellidos" VARCHAR(50) NOT NULL,
    "direccion" VARCHAR(50) NOT NULL,
    "profesion" VARCHAR(50) NOT NULL,
    "fechanacimiento" DATE NOT NULL,
    "lugarnacimiento" VARCHAR(50) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "telefono" VARCHAR(14) NOT NULL,
    "tiposangre" VARCHAR(2) NOT NULL,
    "idusuario" INTEGER NOT NULL,
    "estadocivil" VARCHAR NOT NULL,
    "escolaridad" VARCHAR NOT NULL,
    "nombrepadre" VARCHAR,
    "nombremadre" VARCHAR,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("idpaciente")
);

-- CreateTable
CREATE TABLE "pacientesignovital" (
    "idpacientesignovital" SERIAL NOT NULL,
    "idpaciente" INTEGER NOT NULL,
    "idsignovital" INTEGER NOT NULL,

    CONSTRAINT "pacientesignovital_pkey" PRIMARY KEY ("idpacientesignovital")
);

-- CreateTable
CREATE TABLE "recetaMedica" (
    "idrecetaMedica" SERIAL NOT NULL,
    "unidadtratamiento" VARCHAR(50) NOT NULL,
    "dosis" INTEGER NOT NULL,
    "fechainicio" DATE NOT NULL,
    "fechafin" DATE NOT NULL,
    "idconsulta" INTEGER NOT NULL,

    CONSTRAINT "tratamiento_pkey" PRIMARY KEY ("idrecetaMedica")
);

-- CreateTable
CREATE TABLE "recetatratamiento" (
    "idrecetatratamiento" INTEGER NOT NULL,
    "idrecetamedica" INTEGER NOT NULL,
    "idtratamiento" INTEGER NOT NULL,

    CONSTRAINT "recetatratamiento_pk" PRIMARY KEY ("idrecetatratamiento")
);

-- CreateTable
CREATE TABLE "rol" (
    "idrol" SERIAL NOT NULL,
    "nombrerol" VARCHAR(15) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("idrol")
);

-- CreateTable
CREATE TABLE "signovital" (
    "idsignovital" SERIAL NOT NULL,
    "fecha" DATE,
    "hora" TIME(6),
    "pulso" INTEGER,
    "temperaturac" INTEGER,
    "presionarterial" INTEGER,
    "orina" VARCHAR(50),
    "liquidos" VARCHAR(50),
    "peso" VARCHAR(50),
    "respiracion" VARCHAR(50),

    CONSTRAINT "signovital_pkey" PRIMARY KEY ("idsignovital")
);

-- CreateTable
CREATE TABLE "tipoenfermedad" (
    "idtipoenfermedad" SERIAL NOT NULL,
    "tipoenfermedad" VARCHAR(30) NOT NULL,

    CONSTRAINT "tipoenfermedad_pkey" PRIMARY KEY ("idtipoenfermedad")
);

-- CreateTable
CREATE TABLE "tipotratamiento" (
    "idtipotratamiento" INTEGER NOT NULL,
    "descripcion" VARCHAR NOT NULL,

    CONSTRAINT "tipotratamiento_pk" PRIMARY KEY ("idtipotratamiento")
);

-- CreateTable
CREATE TABLE "tratamiento" (
    "idtratamiento" INTEGER NOT NULL,
    "idnombretratamiento" INTEGER NOT NULL,

    CONSTRAINT "tratamiento_pk" PRIMARY KEY ("idtratamiento")
);

-- CreateTable
CREATE TABLE "tratamientohora" (
    "idtratamientohora" SERIAL NOT NULL,
    "frecuencia" INTEGER NOT NULL,
    "idtratamiento" INTEGER NOT NULL,

    CONSTRAINT "tratamientohora_pkey" PRIMARY KEY ("idtratamientohora")
);

-- CreateTable
CREATE TABLE "unidadsalud" (
    "idunidadsalud" SERIAL NOT NULL,
    "nombreunidadsalud" VARCHAR(100) NOT NULL,
    "numero" VARCHAR,

    CONSTRAINT "unidadsalud_pkey" PRIMARY KEY ("idunidadsalud")
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" SERIAL NOT NULL,
    "contrasena" VARCHAR(15) NOT NULL,
    "correo" VARCHAR(50) NOT NULL,
    "idrol" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "vacunaenfermedad" (
    "idvacunaenfermedad" INTEGER NOT NULL,
    "idefermedad" INTEGER NOT NULL,
    "idvacuna" INTEGER NOT NULL,

    CONSTRAINT "vacunaenfermedad_pk" PRIMARY KEY ("idvacunaenfermedad")
);

-- CreateTable
CREATE TABLE "vacunas" (
    "idvacuna" SERIAL NOT NULL,
    "nombrevacuna" VARCHAR(50),
    "idexpediente" INTEGER NOT NULL,

    CONSTRAINT "vacunacion_pkey" PRIMARY KEY ("idvacuna")
);

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_consulta_fk" FOREIGN KEY ("idconsulta") REFERENCES "consulta"("idconsulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_idexpediente_fkey" FOREIGN KEY ("idexpediente") REFERENCES "expediente"("idexpediente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_idmedico_fkey" FOREIGN KEY ("idmedico") REFERENCES "medico"("idmedico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultasignovitales" ADD CONSTRAINT "consultasignovitales_idconsulta_fkey" FOREIGN KEY ("idconsulta") REFERENCES "consulta"("idconsulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultasignovitales" ADD CONSTRAINT "consultasignovitales_idpacientesignovital_fkey" FOREIGN KEY ("idpacientesignovital") REFERENCES "pacientesignovital"("idpacientesignovital") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dosis" ADD CONSTRAINT "dosis_expediente_fk" FOREIGN KEY ("idexpediente") REFERENCES "expediente"("idexpediente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dosis" ADD CONSTRAINT "dosis_idunidadsalud_fkey" FOREIGN KEY ("idunidadsalud") REFERENCES "unidadsalud"("idunidadsalud") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dosis" ADD CONSTRAINT "dosis_idvacunacion_fkey" FOREIGN KEY ("idvacuna") REFERENCES "vacunas"("idvacuna") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dosis" ADD CONSTRAINT "dosis_medico_fk" FOREIGN KEY ("idmedico") REFERENCES "medico"("idmedico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emergencia" ADD CONSTRAINT "emergencia_expediente_fk" FOREIGN KEY ("idexpediente") REFERENCES "expediente"("idexpediente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "emergencia" ADD CONSTRAINT "emergencia_medico_fk" FOREIGN KEY ("idmedico") REFERENCES "medico"("idmedico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enfermedad" ADD CONSTRAINT "enfermedad_idtipoenfermedad_fkey" FOREIGN KEY ("idtipoenfermedad") REFERENCES "tipoenfermedad"("idtipoenfermedad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expediente" ADD CONSTRAINT "expediente_idpaciente_fkey" FOREIGN KEY ("idpaciente") REFERENCES "pacientes"("idpaciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expediente" ADD CONSTRAINT "expediente_unidadsalud_fk" FOREIGN KEY ("idunidadsalud") REFERENCES "unidadsalud"("idunidadsalud") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historiaclinicaenfermedad" ADD CONSTRAINT "historiaclinicaenfermedad_idenfermedad_fkey" FOREIGN KEY ("idenfermedad") REFERENCES "enfermedad"("idenfermedad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historiaclinicaenfermedad" ADD CONSTRAINT "historiaclinicaenfermedad_idhistoriaclinica_fkey" FOREIGN KEY ("idhistoriaclinica") REFERENCES "historialclinico"("idhistorialclinico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historialclinico" ADD CONSTRAINT "historialclinico_idexpediente_fkey" FOREIGN KEY ("idexpediente") REFERENCES "expediente"("idexpediente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hojaevolucion" ADD CONSTRAINT "hojaevolucion_citas_fk" FOREIGN KEY ("idcita") REFERENCES "citas"("idcitas") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hojaevolucion" ADD CONSTRAINT "hojaevolucion_consulta_fk" FOREIGN KEY ("idconsulta") REFERENCES "consulta"("idconsulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_idunidadsalud_fkey" FOREIGN KEY ("idunidadsalud") REFERENCES "unidadsalud"("idunidadsalud") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medico" ADD CONSTRAINT "medico_idespecialidad_fkey" FOREIGN KEY ("idespecialidad") REFERENCES "especialidad"("idespecialidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medico" ADD CONSTRAINT "medico_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medico" ADD CONSTRAINT "medico_unidadsalud_fk" FOREIGN KEY ("idunidadsalud") REFERENCES "unidadsalud"("idunidadsalud") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_iddepartamento_fkey" FOREIGN KEY ("iddepartamento") REFERENCES "departamento"("iddepartamento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nombretratamiento" ADD CONSTRAINT "nombretratamiento_tipotratamiento_fk" FOREIGN KEY ("idtipotratamiento") REFERENCES "tipotratamiento"("idtipotratamiento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenexamen" ADD CONSTRAINT "ordenexamen_consulta_fk" FOREIGN KEY ("idconsulta") REFERENCES "consulta"("idconsulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenexamen" ADD CONSTRAINT "ordenexamen_idexamen_fkey" FOREIGN KEY ("idexamen") REFERENCES "examen"("idexamen") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_idmunicipio_fkey" FOREIGN KEY ("idmunicipio") REFERENCES "municipio"("idmunicipio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_usuario_fk" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacientesignovital" ADD CONSTRAINT "pacientesignovital_idpaciente_fkey" FOREIGN KEY ("idpaciente") REFERENCES "pacientes"("idpaciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacientesignovital" ADD CONSTRAINT "pacientesignovital_idsignovital_fkey" FOREIGN KEY ("idsignovital") REFERENCES "signovital"("idsignovital") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recetaMedica" ADD CONSTRAINT "tratamiento_consulta_fk" FOREIGN KEY ("idconsulta") REFERENCES "consulta"("idconsulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recetatratamiento" ADD CONSTRAINT "recetatratamiento_recetamedica_fk" FOREIGN KEY ("idrecetamedica") REFERENCES "recetaMedica"("idrecetaMedica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recetatratamiento" ADD CONSTRAINT "recetatratamiento_tratamiento_fk" FOREIGN KEY ("idtratamiento") REFERENCES "tratamiento"("idtratamiento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tratamiento" ADD CONSTRAINT "tratamiento_nombretratamiento_fk" FOREIGN KEY ("idnombretratamiento") REFERENCES "nombretratamiento"("idnombretratamiento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tratamientohora" ADD CONSTRAINT "tratamientohora_tratamiento_fk" FOREIGN KEY ("idtratamiento") REFERENCES "tratamiento"("idtratamiento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idrol_fkey" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vacunaenfermedad" ADD CONSTRAINT "vacunaenfermedad_enfermedad_fk" FOREIGN KEY ("idefermedad") REFERENCES "enfermedad"("idenfermedad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vacunaenfermedad" ADD CONSTRAINT "vacunaenfermedad_vacunas_fk" FOREIGN KEY ("idvacuna") REFERENCES "vacunas"("idvacuna") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vacunas" ADD CONSTRAINT "vacunas_expediente_fk" FOREIGN KEY ("idexpediente") REFERENCES "expediente"("idexpediente") ON DELETE NO ACTION ON UPDATE NO ACTION;
