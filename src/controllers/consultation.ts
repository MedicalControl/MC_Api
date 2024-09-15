import { Request, Response } from "express"
import { NotFoundException } from "../exceptions/not-found"
import { ErrorCode } from "../exceptions/root"
import { prismaClient } from ".."
import { consultationSchema } from "../schemas"


export const createConsultation = async (req: Request, res: Response) => {
    consultationSchema.parse(req.body);
    const {reasonsConsultation, medicalRecordId, plan} = req.body;
    try {
        const createConsultation = await prismaClient.consultation.create({
            data: {
                reasonsConsultation, 
                plan,
                medicalRecord : {
                    connect : {id: medicalRecordId}
                }
            }
        })
        res.json(createConsultation)
    } catch (err) {
        res.json(err)
    }
}

export const updateConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = req.body;
        const updateConsultation = await prismaClient.consultation.update({
            where: {
                id: +req.params.id
            },
            data: consultation
        })
    } catch (err) {
        throw new NotFoundException('Consult not found', ErrorCode.SOME_NOT_FOUND)
    }
}