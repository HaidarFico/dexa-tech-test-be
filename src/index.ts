import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter';
import dbInit from './utils/dbInit';
import employeeAdministrationRouter from './routes/employeeAdministrationRouter';
import rollCallRouter from './routes/rollCallRouter';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbInit();

app.use('/auth', authRouter);
app.use('/employee-administration', employeeAdministrationRouter);
app.use('/roll-call-administration', rollCallRouter);
app.get('/', (req, res) => {
    res.json({
        message: 'server running!'
    });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`started on port ${PORT}`)
});
