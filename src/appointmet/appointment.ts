import { prismaClient } from '../index';
import { Request, Response, NextFunction } from 'express';


interface appointmentnext {
    fechaHora: Date,
}

export const schedule  = async (req: Request, res: Response, next: NextFunction) => {
    res.json('shedule');
}