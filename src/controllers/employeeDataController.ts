import { StatusCodes } from "http-status-codes";
import sequelize from "../utils/db";
import { Request, Response, NextFunction } from "express";
import { QueryTypes } from "sequelize";


const ViewEmployeeDataById = async (req: any, res: Response) => {
    try {
        const employeeDataModel = sequelize.model('EmployeeData');
        const userId = req.params['userId'];
        // const employeeDataInstance = await employeeDataModel.findOne({ where: { userId: userId } });
        const employeeDataInstance: any = await sequelize.query(
            `SELECT * FROM user_account as ua INNER JOIN employee_data as ed ON ua.userId = ed.userId WHERE ed.userId = ? LIMIT 1`,
            {
                type: QueryTypes.SELECT,
                replacements: [userId]
            }
        )
        if (employeeDataInstance === null) {
            res.status(404).json(
                {
                    errors: StatusCodes.NOT_FOUND,
                    message: 'Employee Data Not Found!',
                    data: null,
                }
            )
        }
        res.status(200).json(
            {
                errors: null,
                message: 'Employee Data Found!',
                data: {
                    employeeDataId: employeeDataInstance[0].employeeDataId,
                    userId: employeeDataInstance[0].userId,
                    fullName: employeeDataInstance[0].fullName,
                    dateOfBirth: employeeDataInstance[0].dateOfBirth,
                    gender: employeeDataInstance[0].gender,
                    position: employeeDataInstance[0].position,
                    email: employeeDataInstance[0].emailAddress
                },
            }
        )
    }
    catch (error) {

    }
}

const ViewManyEmployeeData = async (req: any, res: Response) => {
    try {
        const employeeDataModel = sequelize.model('EmployeeData');
        const page = req.query['page'] || 0;
        
        const employeeDataInstance = await sequelize.query(
            `SELECT * FROM user_account as ua INNER JOIN employee_data as ed ON ua.userId = ed.userId LIMIT 10 OFFSET ?`,
            {
                type: QueryTypes.SELECT,
                replacements: [page * 10]
            }
        );
        console
        if (employeeDataInstance === null) {
            res.status(404).json(
                {
                    errors: StatusCodes.NOT_FOUND,
                    message: 'Employee Data Not Found!',
                    data: null,
                }
            )
        }
        res.status(200).json(
            {
                errors: null,
                message: 'Employee Data Found!',
                data: {
                    employeeDataArray: [employeeDataInstance]
                },
            }
        )
    }
    catch (error) {

    }
}

// const CreateEmployeeData = async (req: any, res: Response, next: NextFunction) => {
//     try {
//         const employeeDataModel = sequelize.model('EmployeeData');
//         const { full_name, date_of_birth, gender, position } = req.body;
//         const employeeDataInstance = await employeeDataModel.create({
//             fullName: full_name,
//             dateOfBirth: date_of_birth,
//             gender: gender,
//             position: position,
//         });
//         if (employeeDataInstance === null) {
//             throw new Error('Create employee data failed!');
//         }
//         res.status(201).json(
//             {
//                 errors: null,
//                 message: 'Employee Data Created!',
//                 data: {
//                     employeeDataId: employeeDataInstance?.getDataValue('employeeDataId'),
//                     userId: employeeDataInstance?.getDataValue('userId'),
//                     fullName: employeeDataInstance?.getDataValue('fullName'),
//                     dateOfBirth: employeeDataInstance?.getDataValue('dateOfBirth'),
//                     gender: employeeDataInstance?.getDataValue('gender'),
//                     position: employeeDataInstance?.getDataValue('position'),                },
//             }
//         )
//     }
//     catch (error) {

//     }
// }

const UpsertEmployeeDataById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const employeeDataModel = sequelize.model('EmployeeData');
        const { user_id, full_name, date_of_birth, gender, position } = req.body;



        let employeeDataInstance = await employeeDataModel.findOne({
            where: {
                userId: user_id,
            }
        });
        console.log(`THIS IS ${employeeDataInstance}`)
        if (employeeDataInstance === null) {
            employeeDataInstance = employeeDataModel.build();
        }
        employeeDataInstance.update({
            userId: user_id,
            fullName: full_name,
            dateOfBirth: date_of_birth,
            gender: gender,
            position: position,
        });
        res.status(200).json(
            {
                errors: null,
                message: 'Employee Data Updated!',
                data: {
                    userId: employeeDataInstance.getDataValue('userId'),
                    fullName: employeeDataInstance.getDataValue('fullName'),
                    dateOfBirth: employeeDataInstance.getDataValue('dateOfBirth'),
                    gender: employeeDataInstance.getDataValue('gender'),
                    position: employeeDataInstance.getDataValue('position'),
                },
            }
        )
    }
    catch (error) {

    }
}

export { ViewEmployeeDataById, UpsertEmployeeDataById, ViewManyEmployeeData }