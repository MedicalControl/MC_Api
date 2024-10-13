-- AlterTable
CREATE SEQUENCE administrador_pk_administrador_seq;
ALTER TABLE "administrador" ALTER COLUMN "pk_administrador" SET DEFAULT nextval('administrador_pk_administrador_seq');
ALTER SEQUENCE administrador_pk_administrador_seq OWNED BY "administrador"."pk_administrador";

-- AlterTable
CREATE SEQUENCE examenheces_pk_examenheces_seq;
ALTER TABLE "examenheces" ALTER COLUMN "pk_examenheces" SET DEFAULT nextval('examenheces_pk_examenheces_seq');
ALTER SEQUENCE examenheces_pk_examenheces_seq OWNED BY "examenheces"."pk_examenheces";

-- AlterTable
CREATE SEQUENCE examenorina_pk_examenorina_seq;
ALTER TABLE "examenorina" ALTER COLUMN "pk_examenorina" SET DEFAULT nextval('examenorina_pk_examenorina_seq');
ALTER SEQUENCE examenorina_pk_examenorina_seq OWNED BY "examenorina"."pk_examenorina";

-- AlterTable
CREATE SEQUENCE examensangre_pk_examensangre_seq;
ALTER TABLE "examensangre" ALTER COLUMN "pk_examensangre" SET DEFAULT nextval('examensangre_pk_examensangre_seq');
ALTER SEQUENCE examensangre_pk_examensangre_seq OWNED BY "examensangre"."pk_examensangre";

-- AlterTable
CREATE SEQUENCE laboratorio_pk_laboratorio_seq;
ALTER TABLE "laboratorio" ALTER COLUMN "pk_laboratorio" SET DEFAULT nextval('laboratorio_pk_laboratorio_seq');
ALTER SEQUENCE laboratorio_pk_laboratorio_seq OWNED BY "laboratorio"."pk_laboratorio";

-- AlterTable
CREATE SEQUENCE ordenlaboratorio_pk_ordenlaboratorio_seq;
ALTER TABLE "ordenlaboratorio" ALTER COLUMN "pk_ordenlaboratorio" SET DEFAULT nextval('ordenlaboratorio_pk_ordenlaboratorio_seq');
ALTER SEQUENCE ordenlaboratorio_pk_ordenlaboratorio_seq OWNED BY "ordenlaboratorio"."pk_ordenlaboratorio";

-- AlterTable
CREATE SEQUENCE pacienteusuario_pk_pacienteusuario_seq;
ALTER TABLE "pacienteusuario" ALTER COLUMN "pk_pacienteusuario" SET DEFAULT nextval('pacienteusuario_pk_pacienteusuario_seq');
ALTER SEQUENCE pacienteusuario_pk_pacienteusuario_seq OWNED BY "pacienteusuario"."pk_pacienteusuario";

-- AlterTable
CREATE SEQUENCE tipomedicamento_pk_tipomedicamento_seq;
ALTER TABLE "tipomedicamento" ALTER COLUMN "pk_tipomedicamento" SET DEFAULT nextval('tipomedicamento_pk_tipomedicamento_seq');
ALTER SEQUENCE tipomedicamento_pk_tipomedicamento_seq OWNED BY "tipomedicamento"."pk_tipomedicamento";
