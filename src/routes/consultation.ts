import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import authMiddleware from "../middlewares/auth";
import {adminMiddleWare} from "../middlewares/admin";
import { createConsultation } from "../controllers/consultation";

const consultationRoutes: Router = Router()

consultationRoutes.post('/', [authMiddleware, adminMiddleWare], errorHandler(createConsultation))

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



export default consultationRoutes;
