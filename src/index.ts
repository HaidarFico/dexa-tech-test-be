import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter';
import { sequelize, dbInit } from './utils/db';

dotenv.config();
const app = express();
app.use(cors());
app.use(authRouter);
dbInit(sequelize);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`started on port ${PORT}`)
});
