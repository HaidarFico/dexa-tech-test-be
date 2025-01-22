import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const EmployeeData = sequelize.define(
    'EmployeeData',
    {
        employeeDataId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        fullName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
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

export default EmployeeData;