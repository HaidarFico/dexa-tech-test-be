import express from "express";
import { UpsertEmployeeDataById, ViewEmployeeDataById, ViewManyEmployeeData } from "../controllers/employeeDataController";
import { validateHRFromJWTToken } from "../middleware/jwt";

const employeeAdministrationRouter = express.Router()

employeeAdministrationRouter.route('/employee-data')
    .post(validateHRFromJWTToken, UpsertEmployeeDataById)
    .get(validateHRFromJWTToken, ViewManyEmployeeData)

employeeAdministrationRouter.get('/employee-data/:userId', validateHRFromJWTToken, ViewEmployeeDataById)
export default employeeAdministrationRouter;