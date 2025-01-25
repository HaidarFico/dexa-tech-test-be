import implementRelations from "../models/relations";
import { PermissionsMigration } from '../migration/permissionsMigration'
import sequelize from "./db";
import { userRolesMigration } from "../migration/userRolesMigration";
import { GrantedPermissionsMigration } from "../migration/grantedPermissionsMigration";

const dbInit = async (isSeed: boolean) => {
    await implementRelations();
    if(isSeed) {
        await PermissionsMigration(sequelize.getQueryInterface());
        await userRolesMigration(sequelize.getQueryInterface());
        await GrantedPermissionsMigration(sequelize.getQueryInterface());
    }
}

export default dbInit;