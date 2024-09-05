import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createMedicine } from "../controllers/medicine";
import authMiddleware from "../middlewares/auth";

const medicineRoutes:Router = Router()

medicineRoutes.post('/', [authMiddleware], errorHandler(createMedicine))

export default medicineRoutes