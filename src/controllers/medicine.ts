import { Request, Response } from "express";
import { prismaClient } from "..";
export const createMedicine = async (req: Request, res: Response) => {

    const {name, unidad, dosis, type, consultationid} = req.body;

    const medicine = await prismaClient.tratament.create({
        data: {
            name, 
            unidad, 
            dosis, 
            type, 
            consultation: {
                connect: {id: consultationid}
            }
        }
    })

    res.json(medicine)

}