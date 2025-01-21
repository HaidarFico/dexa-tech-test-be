import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const AttainedRoles = sequelize.define(
    'AttainedRoles',
    {
        userId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        roleId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
    },
    {
        tableName: 'attained_roles',
    }
);

sequelize.sync();

export default AttainedRoles;