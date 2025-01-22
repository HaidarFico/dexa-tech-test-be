import { sequelize } from "../utils/db";
import UserAccount from "../models/user_account";
import UserRoles from "../models/user_roles";
import { Request, Response, NextFunction } from "express";
import EmployeeData from "../models/employee_data";
import bcrypt from 'bcrypt';
import { generateJWTToken } from "../middleware/jwt";

const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await sequelize.transaction();
        const { password, emailAddress } = req.body;
        const salt = await bcrypt.genSalt();

        const newUser = await UserAccount.create(
            {
                passwordHash: bcrypt.hashSync(password, salt),
                passwordSalt: salt,
                emailAddress: emailAddress,
            },
            {
                transaction: transaction,
            }
        );
        const newEmployeeData = await EmployeeData.create(
            {
                userId: newUser.getDataValue('userId'),
            },
            { transaction: transaction }
        );
        await transaction.commit();
        res.status(201).json(
            {
                errors: null,
                message: 'User created successfully!',
                data: {
                    temp: 'placeholder'
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
        const { email, password } = req.body;
        const emailLowerCase = email.toLowerCase()
        const user = await UserAccount.findOne({ where: { emailAddress: emailLowerCase } })
        if (user === null) {
            throw new Error('User not found!')
        }

        const hashedPassword = bcrypt.hashSync(password, user.getDataValue('passwordSalt'));
        if (hashedPassword !== user.getDataValue('passwordHash')) {
            throw new Error('Password does not match');
        }

        const token = generateJWTToken(emailLowerCase);
        res.status(200).json(
            {
                errors: null,
                message: 'Login Succesfull!!',
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