import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createMedicine, listMedicineToPatient } from "../controllers/medicine";
import authMiddleware from "../middlewares/auth";
import adminMiddleWare from "../middlewares/admin";

const medicineRoutes:Router = Router()

medicineRoutes.post('/', [authMiddleware, adminMiddleWare], errorHandler(createMedicine))
medicineRoutes.get('/', [authMiddleware], errorHandler(listMedicineToPatient))

export default medicineRoutes