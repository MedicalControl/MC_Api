import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod'; 
import { prismaClient } from '../../index';

export const listmedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { numero } = req.params;

    const validatedData = ({ numero });

    const medicalRecordData = await prismaClient.expediente.findMany({
      where: {
        nroexpediente: validatedData.numero,
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
