import { Sequelize } from "sequelize";
import dbconfig from '../config/db.config';

// Import used models for dbInit
import AttainedRoles from "../models/attained_roles";
import EmployeeData from "../models/employee_data";
import GrantedPermissions from "../models/granted_permissions";
import EmployeeRollCall from "../models/employee_roll_call";
import UserAccount from "../models/user_account";
import UserRoles from "../models/user_roles";

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

const dbInit = (sequelize: Sequelize) => {
    sequelize.sync();
}

export {sequelize, dbInit};