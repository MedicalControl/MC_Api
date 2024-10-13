import { prismaClient } from ".."
import { Request, Response } from 'express'

export const listDistrict = async (req: Request, res: Response) => {
    const data = await prismaClient.departamento.findMany( {
        select: {
            nombre: true
        }
    });
    res.json(data);
}

export const listMunicipalityByDistrict = async(req: Request, res:Response) => {
    const list = await prismaClient.municipio.findMany({
        where: {
            pk_municipio: +req.params.id
        }, 
        select: {
            nombre: true
        }
    });
    res.json(list)
}