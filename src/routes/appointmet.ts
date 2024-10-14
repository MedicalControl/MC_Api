import { Router } from "express";
import { schedule } from "../appointmet/appointment";
import { medicosMiddleWare } from "../middlewares/admin";
import authMiddleware from '../middlewares/auth';


const appointmetsRoutes: Router = Router()

appointmetsRoutes.post('/appointment',[authMiddleware, medicosMiddleWare],schedule);

export default appointmetsRoutes;