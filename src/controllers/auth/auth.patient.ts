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
      nombres: "Eliezer Jose",
      apellidos: "Acuña Matus",
      direccion: "ciudad sandino",
      telefono: "00000000",
      ocupacion: "desempleado",
      estadocivil: "soltero",
      sexo: true,
      religion: "catolica",
      escolaridad: "secundaria",
      fechanacimiento: new Date("2005-03-20"), // Asegúrate de convertir la fecha a objeto Date si es necesario
      nrocedula: "001-2003",
      fk_municipio: 2, // Asegúrate de que este ID exista
      pacienteusuario: {
        create: {
          usuario: {
            create: {
              contrasena: hashSync("eliezerjose12", JWT_ROUND), // Asegúrate de que la contraseña esté correctamente hasheada
              correo: "eacuna043@gmail.com",
              rol: "USER"
            },
          },
        },
      },
    },
  });

  res.json(patient);
};
