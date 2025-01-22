import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const GrantedPermissions = sequelize.define(
    'GrantedPermissions',
    {
        grantedPermissionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        roleId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        permissionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
    },
    {
        tableName: 'granted_permissions',
    }
);

export default GrantedPermissions;