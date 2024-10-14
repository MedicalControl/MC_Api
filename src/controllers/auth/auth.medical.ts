import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_ROUND, JWT_SECRET } from "../../config";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { signupMedicalSchema, signUpSchemaMedicalToPatiente } from "../../schemas";


interface paciente {
  nombres: string;
  direccion: string;
  ocupacion: string;
  apellidos: string;
  nrocedula?: string;
  telefono: string;
  sexo: boolean;
  fechanacimiento: string;
  fk_municipio: number;
  estadocivil: string;
  religion: string;
  escolaridad: string;
}

interface medico {
  nombres: string;
  apellidos: string;
  correo: string;
  contraseña: string;
  fk_especialidad: number;
  direccion: string;
  telefono: string;
}

export const signup_patient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signUpSchemaMedicalToPatiente.parse(req.body);
  const {
    nombres,
    direccion,
    ocupacion,
    apellidos,
    nrocedula,
    telefono,
    fechanacimiento,
    fk_municipio,
    sexo,
    estadocivil,
    religion,
    escolaridad,
  }: paciente = req.body;
  const birthDateC = new Date(fechanacimiento);
  let patient;

  patient = await prismaClient.paciente.create({
    data: {
      nombres,
      apellidos,
      direccion,
      fechanacimiento: new Date(),
      ocupacion,
      nrocedula: nrocedula ?? "",
      estadocivil,
      escolaridad,
      sexo,
      religion,
      telefono,
      municipio: {
        connect: {
          pk_municipio: fk_municipio,
        },
      },
    },
  });
  res.json(patient);
};

export const signup_medical = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signupMedicalSchema.parse(req.body);
  const {
    nombres,
    apellidos,
    correo,
    contraseña,
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
          contrasena: hashSync(contraseña, JWT_ROUND),
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
