import { prismaClient } from "../../index";
import { Request, Response, NextFunction } from "express";
import { medicalRecordSchema } from "../../schemas";
import { ZodError } from "zod";

interface medicalRecord {
  numero: string;
}

export const listmedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const { numero }: medicalRecord = medicalRecordSchema.parse(req.body);
    
        const medicalRecordData = await prismaClient.expediente.findMany({
          where: {
            nroexpediente: numero,
          },
          select: {
            nroexpediente: true,
            paciente: {
              select: {
                nombres: true,
                apellidos: true,
                nrocedula: true,
              },
            },
          },
        });
    
        res.json(medicalRecordData);
    
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            message: "Error de validación",
            issues: error.errors,
          });
        }
        next(error);
      }
};
