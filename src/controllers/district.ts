import { prismaClient } from ".."
import { Request, Response } from 'express'

export const listDistrict = async (req: Request, res: Response) => {
    const data = await prismaClient.distric.findMany();
    res.json(data);
}

export const listMunicipalityByDistrict = async(req: Request, res:Response) => {
    const list = await prismaClient.municipality.findMany({
        where: {
            districid: +req.params.id
        }
    });
    res.json(list)
}