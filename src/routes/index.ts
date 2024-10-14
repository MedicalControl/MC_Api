import { Router } from "express";
import authRoutes from './auth'
import medicineRoutes from "./medicine";
import district_medicineRouter from "./patient";
import consultationRoutes from "./consultation";
import medicalRoutes from "./medical";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/medicine', medicineRoutes)
rootRouter.use('/district', district_medicineRouter)
rootRouter.use('/consultation', consultationRoutes )
rootRouter.use('/app', medicalRoutes)


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