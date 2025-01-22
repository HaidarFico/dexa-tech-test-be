import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db"
import UserRoles from "./user_roles";
import GrantedPermissions from "./granted_permissions";

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
// Permissions.belongsToMany(UserRoles, {through: GrantedPermissions, foreignKey: 'permissionId'});
// sequelize.sync();

export default Permissions;