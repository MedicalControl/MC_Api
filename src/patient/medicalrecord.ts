import { prismaClient } from "../index";
import { Request, Response, NextFunction } from "express";
import { medicalRecordSchema } from "../schemas";

interface medicalRecord {
  numero: string;
}

export const listmedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  medicalRecordSchema.parse(req.body);
  const { numero }: medicalRecord = req.body;

  await prismaClient.expediente.findMany({
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
};
