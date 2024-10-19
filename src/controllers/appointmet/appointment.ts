import { prismaClient } from "../../index";
import { Request, Response, NextFunction } from "express";
import { attendSchema, createAppointmentDoctoSchema } from "../../schemas";
import { date, ZodError } from "zod";
import { usuario } from "@prisma/client";
import { randomBytes } from "crypto";
import { connect } from "http2";

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
interface tratamient {
  nombre: string;
  cantidad: number;
  frecuencia: string;
}

const tratamient: tratamient = {
  nombre: "asd",
  cantidad: 2,
  frecuencia: "2 veces",
};

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
      pk_agendacita: true,
      paciente: {
        select: {
          nombres: true,
          apellidos: true,
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

interface attendData {
  fk_agendacita: number;
  motivo: string;
  sintomas: string;
  diagnostico: string;
  indicaciones: string;
  recetas?: Array<{
    tratamientos: Array<{
      nombre: string;
      cantidad: number;
      frecuencia: string;
    }>;
  }>;
}

export const attend_appointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      fk_agendacita,
      motivo,
      sintomas,
      diagnostico,
      indicaciones,
      recetas = [],
    }: attendData = attendSchema.parse(req.body);

    const getPatientid = await prismaClient.agendacita.findFirst({
      where: {
        pk_agendacita: fk_agendacita,
      },
      select: {
        fk_paciente: true,
      },
    });

    if (!getPatientid) return res.status(404).json({ message: "Cita no encontrada" });

    let verifyMedicalRecord = await prismaClient.expediente.findFirst({
      where: {
        fk_paciente: getPatientid.fk_paciente,
      },
    });

    if (!verifyMedicalRecord) {
      verifyMedicalRecord = await prismaClient.expediente.create({
        data: {
          nroexpediente: randomBytes(4).toString("hex"),
          fk_paciente: getPatientid.fk_paciente,
        },
      });
    }
    
    const attendData = await prismaClient.cita.create({
      data: {
        fk_agendacita,
        motivo,
        sintomas,
        diagnostico,
        indicaciones,
        fk_expediente: verifyMedicalRecord.pk_expediente,
      },
    });

    for (const receta of recetas) {
      const recetaMedica = await prismaClient.recetamedica.create({
        data: {
          fk_cita: attendData.pk_cita,

        },
      });

      for (const tratamiento of receta.tratamientos) {
        const medicamento = await prismaClient.medicamento.findFirst({
          where: { nombre: tratamiento.nombre },
        });

        if (!medicamento) {
          return res.status(404).json({ message: `Medicamento ${tratamiento.nombre} no encontrado` });
        }

        await prismaClient.recetatratamiento.create({
          data: {
            cantidad: tratamiento.cantidad,
            frecuencia: tratamiento.frecuencia,
            fk_medicamento: medicamento.pk_medicamento,
            fk_recetamedica: recetaMedica.pk_recetamedica,
          },
        });
      }
    }

    // Actualizar el estado de la cita
    await prismaClient.agendacita.update({
      where: {
        pk_agendacita: fk_agendacita,
      },
      data: {
        estado: "Realizado",
      },
    });

    res.json(attendData);
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