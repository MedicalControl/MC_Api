import { Router } from "express";
import { schedule } from "../appointmet/appointment";
import { medicosMiddleWare } from "../middlewares/admin";
import authMiddleware from '../middlewares/auth';
import { listmedicalRecord } from "../patient/medicalrecord";


const medicalRoutes: Router = Router()

medicalRoutes.post('/appointment',[authMiddleware, medicosMiddleWare],schedule);
medicalRoutes.get('/medicalRecord', [authMiddleware, medicosMiddleWare], listmedicalRecord)


export default medicalRoutes;