import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createMedicine, listMedicineToPatient } from "../controllers/medicine";
import authMiddleware from "../middlewares/auth";
import adminMiddleWare from "../middlewares/admin";

const medicineRoutes: Router = Router()

medicineRoutes.post('/', [authMiddleware, adminMiddleWare], errorHandler(createMedicine))
medicineRoutes.get('/', [authMiddleware], errorHandler(listMedicineToPatient))

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
