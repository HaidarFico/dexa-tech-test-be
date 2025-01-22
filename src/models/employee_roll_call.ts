import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db"
import UserAccount from "./user_account";

const EmployeeRollCall = sequelize.define(
    'EmployeeRollCall',
    {
        rollCallId: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        clockInTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        clockOutTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        PhotoId: {
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

// UserAccount.hasMany(EmployeeRollCall, {
//     foreignKey: 'UserId'
// });

// sequelize.sync();

export default EmployeeRollCall;