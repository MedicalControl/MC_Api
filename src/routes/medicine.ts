import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import { createMedicine, listMedicine } from "../controllers/medicine";
import authMiddleware from "../middlewares/auth";
import {adminMiddleWare} from "../middlewares/admin";

const medicineRoutes: Router = Router()

medicineRoutes.post('/', [authMiddleware, adminMiddleWare], errorHandler(createMedicine))
medicineRoutes.get('/', [authMiddleware], errorHandler(listMedicine))


/**
 * @swagger
 * /api/medicine/:
 *   get:
 *     summary: List of medicine
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - medicine
 *     responses:
 *       200:
 *         description: List of medicine OK
 *       401:
 *         description: No auth
 *       500:
 *         description: Error
 */



export default medicineRoutes;
