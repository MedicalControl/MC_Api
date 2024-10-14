import { prismaClient } from "../../index";
import { Request, Response, NextFunction } from "express";
import { createAppointmentDoctoSchema } from "../../schemas";
import { date, ZodError } from "zod";
import { usuario } from "@prisma/client";

interface appointmentnext {
  fecha: string;
  hora: string;
  cedula: string;
}

declare module "express" {
  interface Request {
    user?: usuario;
  }
}

export const schedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fecha, hora, cedula }: appointmentnext =
      createAppointmentDoctoSchema.parse(req.body);
    const primaryKeyDoctor = await prismaClient.doctor.findFirst({
      where: {
        fk_usuario: req.user?.pk_usuario,
      },
      select: {
        pk_doctor: true,
      },
    });
    const primaryKeyPaciente = await prismaClient.paciente.findFirst({
      where: {
        nrocedula: cedula,
      },
      select: {
        pk_paciente: true,
      },
    });

    if (!primaryKeyPaciente)
      return res.status(404).json({ message: "Paciente no encontrado" });
    if (!primaryKeyDoctor)
      return res.status(404).json({ message: "Doctor no encontrado" });

    const [horas, minutos, segundos] = hora.split(":");
    const fechaHora = new Date(fecha);
    fechaHora.setHours(Number(horas), Number(minutos), Number(segundos));

    await prismaClient.agendacita
      .create({
        data: {
          fechahora: fechaHora,
          fk_doctor: primaryKeyDoctor.pk_doctor,
          fk_paciente: primaryKeyPaciente.pk_paciente,
          estado: "Revision",
        },
      })
      .catch((err) => {
        console.log(err);
      });

    res.json("shedule");
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


export const get_appointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const primaryKeyDoctor = await prismaClient.doctor.findFirst({
    where: {
      fk_usuario: req.user?.pk_usuario,
    },
    select: {
      pk_doctor: true,
    },
  });
  const appointmentData = await prismaClient.agendacita.findMany({
    where: {
      fk_doctor: primaryKeyDoctor?.pk_doctor,
    },
    select: {
      estado: true,
      paciente: {
        select: {
          nombres: true,
          nrocedula: true,

          expediente: {
            select: {
              nroexpediente: true,
            },
          },
        },
      },
    },
  });
  res.json(appointmentData);
};
