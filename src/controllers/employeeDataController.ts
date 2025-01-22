import { StatusCodes } from "http-status-codes";
import sequelize from "../utils/db";
import { Request, Response, NextFunction } from "express";


const ViewEmployeeDataById = async (req: any, res: Response) => {
    try {
        const employeeDataModel = sequelize.model('EmployeeData');
        const userId = req.params['userId'];
        const employeeDataInstance = await employeeDataModel.findOne({ where: { userId: userId } });
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
                    employeeDataId: employeeDataInstance?.getDataValue('employeeDataId'),
                    userId: employeeDataInstance?.getDataValue('userId'),
                    fullName: employeeDataInstance?.getDataValue('fullName'),
                    dateOfBirth: employeeDataInstance?.getDataValue('dateOfBirth'),
                    gender: employeeDataInstance?.getDataValue('gender'),
                    position: employeeDataInstance?.getDataValue('position'),

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
        
        const employeeDataInstance = await employeeDataModel.findAll(
            {
                limit: 10,
                offset: page * 10,
                // order: ['updatedAt', 'DESC']
            }
        );
        console.log('SAMPE SINI')
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