import { DataTypes } from "sequelize";
import sequelize from "../utils/db"
import UserAccount from "./user_account";
import AttainedRoles from "./attained_roles";
import Permissions from "./permissions";
import GrantedPermissions from "./granted_permissions";

const UserRoles = sequelize.define(
    'UserRoles',
    {
        roleId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        roleName: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        tableName: 'user_role',
    }
);
UserRoles.belongsToMany(UserAccount, {through: AttainedRoles, foreignKey: 'roleId'});
UserRoles.belongsToMany(Permissions, {through: GrantedPermissions, foreignKey: 'roleId'});
sequelize.sync();

export default UserRoles;