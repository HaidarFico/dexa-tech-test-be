import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const Permissions = sequelize.define(
    'Permissions',
    {
        permissionId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        permissionName: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        tableName: 'permissions',
    }
);

export default Permissions;