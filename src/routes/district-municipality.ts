import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import { listDistrict, listMunicipalityByDistrict } from "../controllers/district";

const district_municipalityRouter: Router = Router()

district_municipalityRouter.get('/', errorHandler(listDistrict))
district_municipalityRouter.get('/Municipality/:id', errorHandler(listMunicipalityByDistrict))

export default district_municipalityRouter;
