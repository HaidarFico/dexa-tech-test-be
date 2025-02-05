import sequelize from "../utils/db";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { generateJWTToken } from "../middleware/jwt";
import { StatusCodes } from "http-status-codes";
import { QueryTypes } from "sequelize";


const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAccountModel = sequelize.model('UserAccount');
        const employeeDataModel = sequelize.model('EmployeeData');

        const transaction = await sequelize.transaction();
        const { password, email_address, user_role } = req.body;
        let userRole: any | null = null;
        if (user_role === 'hr') {
            userRole = await sequelize.query('SELECT roleId FROM user_role WHERE roleName = ? OR roleName = ?',
                {
                    type: QueryTypes.SELECT,
                    replacements: ['hr', 'user']
                }
            );
        } else {
            userRole = await sequelize.query('SELECT roleId FROM user_role WHERE roleName = ?',
                {
                    type: QueryTypes.SELECT,
                    replacements: ['user']
                }
            );
        }

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
        if (newUser === null) {
            throw new Error('create new user fail!');
        }

        const newEmployeeData = await employeeDataModel.create(
            {
                userId: newUser.getDataValue('userId'),
            },
            { transaction: transaction }
        );
        if (newEmployeeData === null) {
            throw new Error('create new user fail!');
        }
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
        for (let index = 0; index < userRole.length; index++) {
            await sequelize.query(
                'INSERT INTO attained_roles (userId, roleId, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
                {
                    type: QueryTypes.INSERT,
                    replacements: [newUser.getDataValue('userId'), userRole[index].roleId, currentDate, currentDate],
                    transaction: transaction,
                }
            );
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
        console.log(error)
    }
}

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAccountModel = sequelize.model('UserAccount');
        const { email_address, password } = req.body;
        const emailLowerCase = email_address.toLowerCase()
        const user = await userAccountModel.findOne({ where: { emailAddress: emailLowerCase } })
        if (user === null) {
            res.status(403).json(
                {
                    errors: StatusCodes.FORBIDDEN,
                    message: 'Incorrect Password or Email!',
                    data: null,
                }
            ).send();
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
            ).send();
            return;
        }

        const roleQuery = await sequelize.query(
            'SELECT ur.roleName FROM attained_roles AS ar INNER JOIN user_role AS ur ON ar.roleId = ur.roleId WHERE ar.userId = ?',
            {
                type: QueryTypes.SELECT,
                replacements: [user.getDataValue('userId')],
            }
        );
        const roleArr: Array<string> = [];
        roleQuery.forEach((role: any) => {
            roleArr.push(role.roleName)
        });

        const token = generateJWTToken(emailLowerCase, user.getDataValue('userId'), roleArr);
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
        console.log(error)
    }
}
export { RegisterUser, LoginUser }