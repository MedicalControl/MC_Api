import { prismaClient } from '../../src/index';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { JWT_ROUND } from '../../src/config';


const cita: Prisma.recetamedicaCreateInput[] = [
    {
        cita : {connect: {pk_cita : 1}}, 
        pk_recetamedica: 1
    }
]
