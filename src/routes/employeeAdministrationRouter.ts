import express from "express";
import { UpsertEmployeeDataById, ViewEmployeeDataById, ViewManyEmployeeData } from "../controllers/employeeDataController";

const employeeAdministrationRouter = express.Router()

employeeAdministrationRouter.route('/employee-data')
    .post(UpsertEmployeeDataById)
    .get(ViewManyEmployeeData)

employeeAdministrationRouter.get('/employee-data/:userId', ViewEmployeeDataById)
export default employeeAdministrationRouter;