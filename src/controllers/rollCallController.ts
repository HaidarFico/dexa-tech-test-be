import { Request, Response, NextFunction } from "express";
import sequelize from "../utils/db";
import { StatusCodes } from "http-status-codes";


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

    }
}

const CreateRollCall = async (req: any, res: Response, next: NextFunction) => {
    try {
        const rollCallModel = sequelize.model('EmployeeRollCall')
        const { user_id, clock_in_time } = req.body;
        const photoId = crypto.randomUUID();
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

    }
}

const UpdateRollCall = async (req: any, res: Response, next: NextFunction) => {
    try {
        const rollCallModel = sequelize.model('EmployeeRollCall')
        const { user_id, clock_out_time} = req.body;
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

    }
}

export { CreateRollCall, UpdateRollCall, ViewRollCallById }