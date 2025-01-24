import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sequelize from '../utils/db';
import { NextFunction, Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

const generateJWTToken = (email: string, userId: string, roles: Array<string>) => {
    dotenv.config();
    return jwt.sign({ email: email, userId: userId, roles: roles }, process.env.SECRET_ACCESS_TOKEN as string, { expiresIn: '3600s' });
}

const validateJWTToken = async (req: any, res: Response, next: NextFunction) => {
    dotenv.config();
    const authHeader: string = req.headers['authorization'];
    if (authHeader === undefined || authHeader === null) res.sendStatus(401);
    const token = authHeader.split(' ')[1]
    if (token === null) res.sendStatus(401);

    jwt.verify(token as string, process.env.SECRET_ACCESS_TOKEN as string, (err, user) => {
        if (err) res.sendStatus(403)

        req.user = user

        next()
    })
}

const validateHRFromJWTToken = async (req: any, res: Response, next: NextFunction) => {
    dotenv.config();
    const authHeader: string = req.headers['authorization'];
    if (authHeader === undefined || authHeader === null) {
        res.sendStatus(401);
        return;
    }
    const token = authHeader.split(' ')[1]
    if (token === null){
        res.status(403).send();
    } 

    jwt.verify(token as string, process.env.SECRET_ACCESS_TOKEN as string, async (err, user: any) => {
        if (err) {
            res.status(403).send();
        }
        let isAuthenticated = false;
        const userId: any = user.userId;
        req.user = userId;
        const roleQuery = await sequelize.query(
            'SELECT ar.roleId, ur.roleName FROM attained_roles as ar INNER JOIN user_role AS ur ON ar.roleId = ur.roleId WHERE ar.userId = ?',
            {
                type: QueryTypes.SELECT,
                replacements: [userId],
            }
        );
        roleQuery.forEach((value: any) => {
            console.log(value.roleName)
            if(value.roleName === 'hr') {
                isAuthenticated = true;
                next();
            }
        })
        if (!isAuthenticated) {
            res.status(401).send();
        }
    })
}

const validateUserFromJWTToken = async (req: any, res: Response, next: NextFunction) => {
    dotenv.config();
    const authHeader: string = req.headers['authorization'];
    if (authHeader === undefined || authHeader === null) res.sendStatus(401);
    const token = authHeader.split(' ')[1]
    if (token === null) res.status(403).send();


    jwt.verify(token as string, process.env.SECRET_ACCESS_TOKEN as string, async (err, user: any) => {
        if (err) {
            res.status(403).send();
        }
        let isAuthenticated = false;
        const userId: any = user.userId;
        req.user = userId;
        const roleQuery = await sequelize.query(
            'SELECT ar.roleId, ur.roleName FROM attained_roles as ar INNER JOIN user_role AS ur ON ar.roleId = ur.roleId WHERE ar.userId = ?',
            {
                type: QueryTypes.SELECT,
                replacements: [userId],
            }
        );
        roleQuery.forEach((value: any) => {
            console.log(value.roleName)
            if(value.roleName === 'user') {
                isAuthenticated = true;
                next();
            }
        })
        if (!isAuthenticated) {
            res.status(401).send();
        }
    })
}

export { generateJWTToken, validateJWTToken, validateHRFromJWTToken, validateUserFromJWTToken };