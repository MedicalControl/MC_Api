import { Router } from "express";
import { errorHandler } from "../exceptions/error-handler";
import { listDistrict, listMunicipalityByDistrict } from "../controllers/district";

const patientRoutes: Router = Router()

patientRoutes.get('/', errorHandler(listDistrict))
patientRoutes.get('/Municipality/:id', errorHandler(listMunicipalityByDistrict))


export default patientRoutes;

