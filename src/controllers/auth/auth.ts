import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../..";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { NotFoundException } from "../../exceptions/not-found";
import { JWT_SECRET } from "../../config";
import { compareSync } from "bcrypt";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { correo, contraseña } = req.body;
  
    let user = await prismaClient.usuario.findFirst({ where: { correo } });
    console.log(user);
    if (!user)
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    if (!compareSync(contraseña, user.contrasena))
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
  