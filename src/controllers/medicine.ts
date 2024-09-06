import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
export const createMedicine = async (req: Request, res: Response) => {

    const { name, unidad, dosis, type, consultationid } = req.body;

    const medicine = await prismaClient.tratament.create({
        data: {
            name,
            unidad,
            dosis,
            type,
            consultation: {
                connect: { id: consultationid }
            }
        }
    })

    res.json(medicine)
}

export const listMedicineToPatient = async (req: Request, res: Response) => {
    try {
        const user = req.user
        const MedicinePatient = await prismaClient.patient.findUnique({
            where: { id: user?.id },
            include: {
                medicalRecord: {
                    include: {
                        consultation: {
                            include: {
                                trataments: true,
                            },
                        },
                    },
                },
            },
        });
        const medicine = MedicinePatient?.medicalRecord?.consultation.flatMap(consultation => consultation.trataments) || [];
        
        res.json({
            count: medicine.length,
            data: medicine,
        });
    } catch (err) {
        throw new NotFoundException('Medicine not found', ErrorCode.SOME_NOT_FOUND)
    }
}
