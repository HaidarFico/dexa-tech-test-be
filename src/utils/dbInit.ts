import implementRelations from "../models/relations";
import { PermissionsMigration } from '../migration/permissionsMigration'
import sequelize from "./db";
import { userRolesMigration } from "../migration/userRolesMigration";
import { GrantedPermissionsMigration } from "../migration/grantedPermissionsMigration";

const dbInit = (isSeed: boolean) => {
    implementRelations();
    if(isSeed) {
        PermissionsMigration(sequelize.getQueryInterface());
        userRolesMigration(sequelize.getQueryInterface());
        GrantedPermissionsMigration(sequelize.getQueryInterface());
    }
}

export default dbInit;