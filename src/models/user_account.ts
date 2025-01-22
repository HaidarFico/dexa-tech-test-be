import { DataTypes } from "sequelize";
import sequelize from "../utils/db"

const UserAccount = sequelize.define(
    'UserAccount',
    {
        userId: {
            type: DataTypes.UUID,
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

export default UserAccount;