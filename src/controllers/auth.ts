import { NextFunction, Request, Response } from "express";
import {prismaClient} from '..';
import {hashSync,   compareSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnproccessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schemas";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        SignUpSchema.parse(req.body)
        const {email, password , name} = req.body;
    
        let user = await prismaClient.user.findFirst({where: {email}})
        if (user) 
            next (new BadRequestException('User alreay exists!', ErrorCode.USER_ALREADY_EXIST))
        
        user = await prismaClient.user.create({
            data: {
                name, 
                email, 
                password:hashSync(password, 10)
            }
        })
        res.json(user)
    }catch(err: any){
        next( new UnproccessableEntity(err?.issues, 'Unproccesable entity', ErrorCode.UNPORCCESSABLEENTITY ))

    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user) 
        throw Error('User does not exists!')
    if (!compareSync(password, user.password))
        throw Error('email and password not match')
    const token = jwt.sign({
        userId: user.id, 
    }, JWT_SECRET)

    res.json({user, token})
}