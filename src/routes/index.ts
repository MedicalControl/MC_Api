import { Router } from "express";
import authRoutes from './auth'
import medicineRoutes from "./medicine";
import district_medicineRouter from "./district-municipality";
import consultationRoutes from "./consultation";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/medicine', medicineRoutes)
rootRouter.use('/district', district_medicineRouter)
rootRouter.use('/consultation', consultationRoutes )

export default rootRouter;


/**
 * @swagger
 * components: 
 *   securitySchemes: 
 *     apiAuth: 
 *        type: apiKey
 *        in: header
 *        name: authorization
 */