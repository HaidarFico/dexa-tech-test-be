import { DataTypes } from "sequelize";
import sequelize from "../utils/db"
import UserAccount from "./user_account";

const EmployeeData = sequelize.define(
    'EmployeeData',
    {
        userId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        gender: {
            type: DataTypes.CHAR,
            validate: {
                // Check if the gender is either 'f' or 'm'
                is: /^[fm]$/
            },
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    },
    {
        tableName: 'employee_data',
        timestamps: true,
    }
);

UserAccount.hasOne(EmployeeData, {
    foreignKey: 'UserId'
});

sequelize.sync();

export default EmployeeData;