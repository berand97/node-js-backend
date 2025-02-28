import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import { User } from './user.scheme.js';

export const Auth = sequelize.define("Authentication", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        tableName: 'authentications',
    }
);
