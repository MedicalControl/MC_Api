import { NextFunction, Response, Request } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { NetConnectOpts } from "net";


export const adminMiddleWare = async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (user?.rol == "DOCTOR")
        next()
    else
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
}

export const medicosMiddleWare = async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);
    if(user?.rol == "DOCTOR")
        next()
    else 
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
}
