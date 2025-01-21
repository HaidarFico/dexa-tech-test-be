import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`started on port ${PORT}`)
});
