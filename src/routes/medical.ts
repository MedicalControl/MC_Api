import { Router } from "express";
import { attend_appointment, get_appointment, schedule } from "../controllers/appointmet/appointment";
import { medicosMiddleWare } from "../middlewares/admin";
import authMiddleware from '../middlewares/auth';
import { listmedicalRecord } from "../controllers/patient/medicalrecord";


const medicalRoutes: Router = Router()

medicalRoutes.post('/appointment',[authMiddleware, medicosMiddleWare],schedule);
medicalRoutes.get('/appointment',[authMiddleware, medicosMiddleWare],get_appointment);
medicalRoutes.post('/attendappointment',[authMiddleware, medicosMiddleWare],attend_appointment);
medicalRoutes.get('/medicalRecord', [authMiddleware, medicosMiddleWare], listmedicalRecord)


export default medicalRoutes;