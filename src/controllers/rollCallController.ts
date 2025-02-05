import { Request, Response, NextFunction } from "express";
import sequelize from "../utils/db";
import { StatusCodes } from "http-status-codes";
import { QueryTypes } from "sequelize";
import { env } from "process";

const ViewRollCallById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const rollCallModel = sequelize.model('EmployeeRollCall')
        const rollCallId = req.params['rollCallId'];
        const rollCallInstance = await rollCallModel.findOne({ where: { rollCallId: rollCallId } });
        if (rollCallInstance === null) {
            res.status(404).json(
                {
                    errors: StatusCodes.NOT_FOUND,
                    message: 'Roll Call Not Found!',
                    data: null,
                }
            )
        }
        res.status(200).json(
            {
                errors: null,
                message: 'Roll Call Data Found!',
                data: {
                    rollCallInstance
                },
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}

const ViewPhotoByPhotoId = async (req: any, res: Response, next: NextFunction) => {
    try {
        const photoId = req.params['photoId'];
        res.status(200).sendFile(`${process.env.PHOTO_DIRECTORY}${photoId}`);
    }
    catch (error) {
        console.log(error);
    }
}

const ViewLatestRollCallById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const rollCallModel = sequelize.model('EmployeeRollCall')
        const userId = req.params['userId'];
        const rollCallInstance = await rollCallModel.findOne({ where: { userId: userId }, order: [['createdAt', 'DESC']], });
        if (rollCallInstance === null) {
            res.status(404).json(
                {
                    errors: StatusCodes.NOT_FOUND,
                    message: 'Roll Call Not Found!',
                    data: null,
                }
            )
        }
        res.status(200).json(
            {
                errors: null,
                message: 'Roll Call Data Found!',
                data: {
                    rollCallInstance
                },
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}

const ViewManyRollCall = async (req: any, res: Response, next: NextFunction) => {
    try {
        const employeeRollCallModel = sequelize.model('EmployeeRollCall');
        const userAccountModel = sequelize.model('UserAccount');
        const page = req.query['page'] || 0;

        const employeeRollCallInstance = await sequelize.query(
            `SELECT * FROM employee_roll_call as erc INNER JOIN employee_data as ed ON erc.userId = ed.userId LIMIT 10 OFFSET ?`,
            {
                type: QueryTypes.SELECT,
                replacements: [page * 10]
            }
        );
        if (employeeRollCallInstance === null) {
            res.status(404).json(
                {
                    errors: StatusCodes.NOT_FOUND,
                    message: 'Roll Call Not Found!',
                    data: null,
                }
            )
        }
        res.status(200).json(
            {
                errors: null,
                message: 'Roll Call Data Found!',
                data: {
                    employeeRollCallArray: [employeeRollCallInstance]
                },
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}

const CreateRollCall = async (req: any, res: Response, next: NextFunction) => {
    try {
        const rollCallModel = sequelize.model('EmployeeRollCall')
        const { user_id, clock_in_time } = req.body;
        const photoId = req.file.filename;
        const rollCallInstance = await rollCallModel.create({
            userId: user_id,
            clockInTime: clock_in_time,
            photoId: photoId,
        });
        if (rollCallInstance === null) {
            throw new Error('Create Roll Call data failed!');
        }
        res.status(201).json(
            {
                errors: null,
                message: 'Roll Call Data Created!',
                data: {
                    rollCallInstance: rollCallInstance
                },
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}

const UpdateRollCall = async (req: any, res: Response, next: NextFunction) => {
    try {
        const rollCallModel = sequelize.model('EmployeeRollCall')
        const { user_id, clock_out_time } = req.body;
        const rollCallInstance = await rollCallModel.findOne({
            where: {
                userId: user_id,
                clockOutTime: null,
            }
        });
        if (rollCallInstance === null) {
            res.status(404).json(
                {
                    errors: StatusCodes.NOT_FOUND,
                    message: 'Roll Call Not Found!',
                    data: null,
                }
            )
        }
        await rollCallInstance?.update({
            clockOutTime: clock_out_time
        });
        res.status(200).json(
            {
                errors: null,
                message: 'Roll Call Data Updated!',
                data: {
                    rollCallInstance: rollCallInstance,
                },
            }
        )
    }
    catch (error) {
        console.log(error);
    }
}

export { CreateRollCall, UpdateRollCall, ViewRollCallById, ViewManyRollCall, ViewLatestRollCallById, ViewPhotoByPhotoId }