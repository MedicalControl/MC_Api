import { prismaClient } from '../../src/index';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { JWT_ROUND } from '../../src/config';


const user: Prisma.usuarioCreateInput[] = [
    {
        correo:"",
        contrasena: hashSync("", JWT_ROUND)
    }
]