import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_ROUND, JWT_SECRET } from "../config";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { signUpSchema } from "../schemas";
import { NotFoundException } from "../exceptions/not-found";
import { user } from "@prisma/client";


declare module "express" {
  interface Request {
    user?: user;
  }
}

const medicalRecord_Create = (municipalityid: any, districtid: any) =>
  String(municipalityid + districtid);

export const medical_create = async (req: Request, res: Response, next: NextFunction) => {
  const {name, lastname, healthunitid, specialityid, email, password} = req.body;
  let user = await prismaClient.user.findFirst({where: {email}});
  let medical;
  if (user)
      next(new BadRequestException("User already exists!", ErrorCode.USER_ALREADY_EXIST));

  medical = await prismaClient.medical.create({
    data:{
      name, 
      lastname, 
      user: {
        create: {
          password: hashSync(password, JWT_ROUND),
          email,
        },
      },
      healthunit: {
        connect: {id: healthunitid}
      }, 
      speciality: {
        connect: {id: specialityid}
      }
    }
  })
  res.json(medical);
};


export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signUpSchema.parse(req.body);
  const {
    email,
    password,
    name,
    address,
    ocupation,
    bloodType,
    lastname,
    idCard,
    number,
    birthDate,
    inssnumber,
    sex,
    districtid,
    municipalityid,
  } = req.body;
  const birthDateC = new Date(birthDate);
  let user = await prismaClient.user.findFirst({ where: { email } });
  let patient;
  if (user)
    next(
      new BadRequestException(
        "User alreay exists!",
        ErrorCode.USER_ALREADY_EXIST
      )
    );
  patient = await prismaClient.patient.create({
    data: {
      name,
      lastname,
      address,
      birthDate: birthDateC,
      bloodType,
      ocupation,
      inssnumber,
      idCard,
      sex,
      number,
      user: {
        create: {
          password: hashSync(password, JWT_ROUND),
          email,
        },
      },
      municipality: {
        connect: { id: municipalityid },
      },
      district: {
        connect: { id: districtid },
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
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  console.log(user);
  if (!user)
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  if (!compareSync(password, user.password))
    throw new BadRequestException(
      "Incorrect password!",
      ErrorCode.INCORRECT_PASSWORD
    );
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ token });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
