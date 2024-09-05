import { Router } from "express";
import authRoutes from './auth'
import medicineRoutes from "./medicine";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/medicine', medicineRoutes)

export default rootRouter;
