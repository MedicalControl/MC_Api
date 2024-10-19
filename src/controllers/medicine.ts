import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
export const createMedicine = async (req: Request, res: Response) => {
    res.json({msg: 'a'})
}

export const listMedicine = async (req: Request, res: Response) => {
    const Data = await prismaClient.medicamento.findMany({
        select: {
            nombre: true, 
            pk_medicamento: true
        }
    });
    res.json(Data);
}
