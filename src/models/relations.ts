import sequelize from "../utils/db";
import AttainedRoles from "./attained_roles";
import EmployeeData from "./employee_data";
import EmployeeRollCall from "./employee_roll_call";
// import GrantedPermissions from "./granted_permissions";
import Permissions from "./permissions";
import UserAccount from "./user_account";
import UserRoles from "./user_roles";

const implementRelations = () => {
    // sequelize.dropAllSchemas();
    Permissions.belongsToMany(UserRoles, { through: 'granted_permissions', foreignKey: 'permissionId' });
    UserRoles.belongsToMany(Permissions, { through: 'granted_permissions', foreignKey: 'roleId' });
    UserRoles.belongsToMany(UserAccount, { through: 'attained_roles', foreignKey: 'roleId' });
    UserAccount.belongsToMany(UserRoles, { through: 'attained_roles', foreignKey: 'userId' });
    UserAccount.hasOne(EmployeeData, 
        {
        foreignKey: 'userId'
    }
    );
    // EmployeeData.belongsTo(UserAccount);
    UserAccount.hasMany(EmployeeRollCall, {
        foreignKey: 'userId'
    });
    // EmployeeRollCall.belongsTo(UserAccount);
    sequelize.sync();
}

export default implementRelations;
