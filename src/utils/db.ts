import { Sequelize } from "sequelize";
import dbconfig from '../config/db.config';

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        dialect: 'mysql',
        host: dbconfig.HOST,
        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle,
        },
    }
);

export default sequelize;