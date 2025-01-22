import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const UserRoles = sequelize.define(
    'UserRoles',
    {
        roleId: {
            type: DataTypes.UUID,
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

// console.log(Permissions)
// UserRoles.belongsToMany(Permissions, { through: GrantedPermissions, foreignKey: 'roleId' });


export default UserRoles;