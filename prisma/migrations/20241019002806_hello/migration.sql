-- AlterTable
CREATE SEQUENCE recetamedica_pk_recetamedica_seq;
ALTER TABLE "recetamedica" ALTER COLUMN "pk_recetamedica" SET DEFAULT nextval('recetamedica_pk_recetamedica_seq');
ALTER SEQUENCE recetamedica_pk_recetamedica_seq OWNED BY "recetamedica"."pk_recetamedica";
