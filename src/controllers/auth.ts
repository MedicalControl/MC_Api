import { NextFunction, Request, Response } from "express";
import {prismaClient} from '..';
import {hashSync,   compareSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_ROUND, JWT_SECRET } from "../config";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnproccessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schemas";
import { NotFoundtException } from "../exceptions/not-found";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    SignUpSchema.parse(req.body)
    const {email, password , name, address, proffession, placeBirth, bloodType, lastname, identityCard, number} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (user) 
        next (new BadRequestException('User alreay exists!', ErrorCode.USER_ALREADY_EXIST))
    user = await prismaClient.user.create({
        data: {
            name, 
            email, 
            address, 
            placeBirth, 
            lastname, 
            identityCard, 
            bloodType,
            number,
            proffession,
            password:hashSync(password, JWT_ROUND)
        }
    })
    res.json(user)
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user) 
        throw  new NotFoundtException('User not found', ErrorCode.USER_NOT_FOUND)
    if (!compareSync(password, user.password))
        throw new BadRequestException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD)
    const token = jwt.sign({
        userId: user.id,
    }, JWT_SECRET)

    res.json({user, token})
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
    res.json("Hello")
}