import { Request, Response } from "express"
import { NotFoundException } from "../exceptions/not-found"
import { ErrorCode } from "../exceptions/root"
import { prismaClient } from ".."

const updateConsultation = async (req: Request, res: Response) =>{
        try{
            const consultation = req.body;
            const updateConsultation = await prismaClient.consultation.update({
                where: {
                    id: +req.params.id
                }, 
                data: consultation
            })
        }catch(err) {
            throw new NotFoundException('Consult not found', ErrorCode.SOME_NOT_FOUND)
        }
}