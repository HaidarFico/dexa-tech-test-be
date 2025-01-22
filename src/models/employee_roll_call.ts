import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const EmployeeRollCall = sequelize.define(
    'EmployeeRollCall',
    {
        rollCallId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        clockInTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        clockOutTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        photoId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
    },
    {
        tableName: 'employee_roll_call',
        timestamps: true,
    }
);

export default EmployeeRollCall;