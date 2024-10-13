import { NextFunction, Request, response, Response } from "express";
import { prismaClient } from "../..";
import { hashSync, compareSync } from "bcrypt";
import { JWT_ROUND, JWT_SECRET } from "../../config";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { signUpSchema } from "../../schemas";
import { NotFoundException } from "../../exceptions/not-found";
import { usuario } from "@prisma/client";

interface paciente {
  correo: string;
  contraseña: string;
  nombres: string;
  direccion: string;
  ocupacion: string;
  apellidos: string;
  nrocedula: string;
  telefono: string;
  fechanacimiento: string;
  sexo: boolean;
  fk_departamento: number;
  fk_municipio: number;
  estadocivil: string;
  religion: string;
  escolaridad: string;
}

declare module "express" {
  interface Request {
    user?: usuario;
  }
}

const medicalRecord_Create = (municipalityid: any, districtid: any) =>
  String(municipalityid + districtid);

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signUpSchema.parse(req.body);
  const {
    correo,
    contraseña,
    nombres,
    direccion,
    ocupacion,
    apellidos,
    nrocedula,
    telefono,
    fechanacimiento,
    sexo,
    fk_municipio,
    estadocivil,
    religion,
    escolaridad,
  }: paciente = req.body;
  const birthDateC = new Date(fechanacimiento);
  let user = await prismaClient.usuario.findFirst({ where: { correo } });
  let patient;
  if (user)
    next(
      new BadRequestException(
        "User alreay exists!",
        ErrorCode.USER_ALREADY_EXIST
      )
    );
  patient = await prismaClient.paciente.create({
    data: {
      nombres,
      apellidos,
      direccion,
      telefono,
      ocupacion,
      estadocivil,
      sexo,
      religion,
      escolaridad,
      fechanacimiento: birthDateC,
      nrocedula,
      fk_municipio,
      pacienteusuario: {
        create: {
          usuario: {
            create: {
              contrasena: hashSync(contraseña, JWT_ROUND), // Asegúrate de que la contraseña esté correctamente hasheada
              correo,
              rol: "USER"
            },
          },
        },
      },
    },
  });

  res.json(patient);
};
