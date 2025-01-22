import express  from "express";
import { RegisterUser, LoginUser } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post('/login', LoginUser);
authRouter.post('/register', RegisterUser);

export default authRouter;