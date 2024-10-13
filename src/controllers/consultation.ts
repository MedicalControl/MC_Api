import { Request, Response } from "express"
import { NotFoundException } from "../exceptions/not-found"
import { ErrorCode } from "../exceptions/root"
import { prismaClient } from ".."
import { consultationSchema } from "../schemas"


export const createConsultation = async (req: Request, res: Response) => {
   res.json({msg: "E"})
}

export const updateConsultation = async (req: Request, res: Response) => {
    res.json({msg: "E"})
}