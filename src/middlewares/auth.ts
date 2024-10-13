import { NextFunction, Response, Request } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";
import { prismaClient } from "..";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const user = await prismaClient.usuario.findFirst({ where: { pk_usuario: payload.userId } });
        console.log(user)
        if (!user) {
            return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
        }

        req.user = user;
        next();
    } catch (err) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
};

export default authMiddleware;
