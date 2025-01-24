import sequelize from "../utils/db";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { generateJWTToken } from "../middleware/jwt";
import { StatusCodes } from "http-status-codes";


const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAccountModel = sequelize.model('UserAccount');
        const employeeDataModel = sequelize.model('EmployeeData');

        const transaction = await sequelize.transaction();
        const { password, email_address } = req.body;
        const salt = await bcrypt.genSalt();

        const newUser = await userAccountModel.create(
            {
                passwordHash: bcrypt.hashSync(password, salt),
                passwordSalt: salt,
                emailAddress: email_address,
            },
            {
                transaction: transaction,
            }
        );
        if(newUser === null) {
            throw new Error('create new user fail!');
        }
        
        const newEmployeeData = await employeeDataModel.create(
            {
                userId: newUser.getDataValue('userId'),
            },
            { transaction: transaction }
        );
        if(newEmployeeData === null) {
            throw new Error('create new user fail!');
        }
        await transaction.commit();
        res.status(201).json(
            {
                errors: null,
                message: 'User created successfully!',
                data: {
                    userId: newUser.getDataValue('userId')
                }
            }
        )
    }
    catch (error) {
        next(new Error(`${error}`))
    }
}

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAccountModel = sequelize.model('UserAccount');
        const { email_address, password } = req.body;
        const emailLowerCase = email_address.toLowerCase()
        const user = await userAccountModel.findOne({ where: { emailAddress: emailLowerCase } })
        if (user === null) {
            throw new Error('User not found!')
        }

        const hashedPassword = bcrypt.hashSync(password, user.getDataValue('passwordSalt'));
        if (hashedPassword !== user.getDataValue('passwordHash')) {
            res.status(403).json(
                {
                    errors: StatusCodes.FORBIDDEN,
                    message: 'Incorrect Password or Email!',
                    data: null,
                }
            )
        }

        const token = generateJWTToken(emailLowerCase, user.getDataValue('userId'), 'TEMP');
        res.status(200).json(
            {
                errors: null,
                message: 'Login Succesfull!',
                data: {
                    token: token
                }
            }
        )
    } catch (error) {
        next(new Error(`${error}`))
    }
}
export { RegisterUser, LoginUser }