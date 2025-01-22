import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const AttainedRoles = sequelize.define(
    'AttainedRoles',
    {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        roleId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
    },
    {
        tableName: 'attained_roles',
    }
);

export default AttainedRoles;