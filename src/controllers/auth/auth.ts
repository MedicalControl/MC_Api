import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../..";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { NotFoundException } from "../../exceptions/not-found";
import { JWT_SECRET } from "../../config";
import { compareSync } from "bcrypt";
import { loginSchema } from "../../schemas";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loginSchema.parse(req.body);
  const { correo, contrasena } = req.body;

  let user = await prismaClient.usuario.findFirst({ where: { correo } });
  if (!user || user.rol == "DOCTOR" || user.rol == "ADMIN")
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  if (!compareSync(contrasena, user.contrasena))
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

export const login_medical = async (req: Request, res: Response) => {
  loginSchema.parse(req.body);
  const { correo, contrasena } = req.body;

  let user = await prismaClient.usuario.findFirst({ where: { correo } });
  if (!user || user.rol == "USER" || user.rol == "ADMIN")
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  if (!compareSync(contrasena, user.contrasena))
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
