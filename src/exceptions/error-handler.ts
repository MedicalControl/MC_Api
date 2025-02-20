import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./root"
import { InternalException } from "./internal-exception"

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException){
                exception = err;
            }
            else{
                exception = new InternalException('Something went wrong!', err, ErrorCode.INTERNALEXCEPTION)
                console.log(err)
            }
            next(exception)
        }
    }
}