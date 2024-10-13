import { NextFunction, Request, response, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_ROUND, JWT_SECRET } from "../config";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { signUpSchema } from "../schemas";
import { NotFoundException } from "../exceptions/not-found";
import { usuario } from "@prisma/client";

interface medico {
  nombres: string;
  apellidos: string;
  correo: string;
  contrase_a: string;
  fk_especialidad: number;
  direccion: string;
  telefono: string;
}

interface paciente {
  correo: string;
  contrase_a: string;
  nombres: string;
  direccion: string;
  ocupacion: string;
  apellidos: string;
  nrocedula: string;
  telefono: string;
  fechanacimiento: string;
  sexo: boolean;
  fk_departamento: number;
  pk_municipio: number;
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

export const medical_create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    nombres,
    apellidos,
    correo,
    contrase_a,
    direccion,
    telefono,
    fk_especialidad,
  }: medico = req.body;

  let user = await prismaClient.usuario.findFirst({ where: { correo } });
  let medical;
  if (user)
    next(
      new BadRequestException(
        "User already exists!",
        ErrorCode.USER_ALREADY_EXIST
      )
    );

  medical = await prismaClient.doctor.create({
    data: {
      nombres,
      apellidos,
      direccion,
      telefono,

      usuario: {
        create: {
          contrase_a: hashSync(contrase_a, JWT_ROUND),
          correo,
          rol: "DOCTOR",
        },
      },
      especialidad: {
        connect: { pk_especialidad: fk_especialidad },
      },
    },
  });
  res.json(medical);
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signUpSchema.parse(req.body);
  const {
    correo,
    contrase_a,
    nombres,
    direccion,
    ocupacion,
    apellidos,
    nrocedula,
    telefono,
    fechanacimiento,
    sexo,
    fk_departamento,
    pk_municipio,
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
      fechanacimiento,
      ocupacion,
      nrocedula,
      estadocivil,
      escolaridad,
      sexo,
      religion,
      telefono,
      pacienteusuario: {
        create: {
          usuario: {
            create: {
              contrase_a: hashSync(contrase_a, JWT_ROUND),
              correo,
            },
          },
        },
      },
      municipio: {
        connect: {
          pk_municipio,
          fk_departamento,
        },
      },
    },
  });
  res.json(patient);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { correo, contrase_a } = req.body;

  let user = await prismaClient.usuario.findFirst({ where: { correo } });
  console.log(user);
  if (!user)
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  if (!compareSync(contrase_a, user.contrase_a))
    throw new BadRequestException(
      "Incorrect password!",
      ErrorCode.INCORRECT_PASSWORD
    );
  const token = jwt.sign(
    {
      userId: user.pk_usuario,
    },
    JWT_SECRET
  );

  res.json({ token });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
