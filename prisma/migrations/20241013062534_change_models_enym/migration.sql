-- AlterTable
CREATE SEQUENCE usuario_pk_usuario_seq;
ALTER TABLE "usuario" ALTER COLUMN "pk_usuario" SET DEFAULT nextval('usuario_pk_usuario_seq');
ALTER SEQUENCE usuario_pk_usuario_seq OWNED BY "usuario"."pk_usuario";
