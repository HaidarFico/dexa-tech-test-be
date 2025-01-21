import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const GrantedPermissions = sequelize.define(
    'GrantedPermissions',
    {
        roleId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        permissionId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
    },
    {
        tableName: 'granted_permissions',
    }
);
sequelize.sync();

export default GrantedPermissions;