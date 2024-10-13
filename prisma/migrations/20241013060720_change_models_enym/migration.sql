-- 1. Eliminar la columna si existe
ALTER TABLE "usuario" DROP COLUMN IF EXISTS "rol";

-- 2. Eliminar la restricción de clave foránea (si no lo has hecho aún)
ALTER TABLE "usuario" DROP CONSTRAINT IF EXISTS "usuario_fk_rol_fkey";

-- 3. Eliminar la tabla que requiere el tipo (si no lo has hecho aún)
DROP TABLE IF EXISTS "rol";

-- 4. Eliminar el tipo (si existe)
DROP TYPE IF EXISTS "rol";

-- 5. Crear el tipo nuevamente
CREATE TYPE "rol" AS ENUM ('USER', 'DOCTOR', 'ADMIN');

-- 6. Agregar la columna nuevamente a la tabla usuario
ALTER TABLE "usuario" ADD COLUMN "rol" "rol" NOT NULL DEFAULT 'USER';
