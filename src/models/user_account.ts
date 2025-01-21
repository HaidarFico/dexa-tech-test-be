import { DataTypes } from "sequelize";
import sequelize from "../utils/db"
import UserRoles from "./user_roles";
import AttainedRoles from "./attained_roles";

const UserAccount = sequelize.define(
    'UserAccount',
    {
        userId: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        passwordHash: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        passwordSalt: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        emailAddress: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value: string) {
                this.setDataValue('emailAddress', value.toLowerCase());
            }
        },
    },
    {
        tableName: 'user_account',
        timestamps: true,
    }
);

UserAccount.belongsToMany(UserRoles, {through: AttainedRoles, foreignKey: 'userId'});

sequelize.sync();

export default UserAccount;