import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

const generateJWTToken = (email: string) => {
    dotenv.config();
    return jwt.sign({ email: email }, process.env.SECRET_ACCESS_TOKEN as string, { expiresIn: '3600s' });
}

const validateJWTToken = (req: any, res: Response, next: NextFunction) => {
    dotenv.config();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1]

    if (token === null) return res.sendStatus(401);

    jwt.verify(token as string, process.env.SECRET_ACCESS_TOKEN as string, (err, user) => {

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })

}
export { generateJWTToken, validateJWTToken };