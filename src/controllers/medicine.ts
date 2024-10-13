import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
export const createMedicine = async (req: Request, res: Response) => {
    res.json({msg: 'a'})
}

export const listMedicineToPatient = async (req: Request, res: Response) => {
    res.json({msg: 'a'})
}
