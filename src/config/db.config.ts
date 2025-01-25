import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    HOST: process.env.DATABASE_HOST as string,
    USER: process.env.DATABASE_USER as string,
    PASSWORD: process.env.DATABASE_PASSWORD as string,
    DB: process.env.DATABASE_NAME as string,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}

export default dbConfig;