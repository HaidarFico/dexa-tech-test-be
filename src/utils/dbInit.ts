// import AttainedRoles from "../models/attained_roles";
import EmployeeData from "../models/employee_data";
import EmployeeRollCall from "../models/employee_roll_call";
// import GrantedPermissions from "../models/granted_permissions";
import Permissions from "../models/permissions";
import implementRelations from "../models/relations";
import UserAccount from "../models/user_account";
import UserRoles from "../models/user_roles";


const modelList = [
    // GrantedPermissions,
    //  AttainedRoles, 
     Permissions, EmployeeData, EmployeeRollCall, UserAccount, UserRoles];

const dbInit = () => {
    // modelList.forEach(async (val) => {
    //     await val.sync()
    // })
    implementRelations()
}

export default dbInit;