import { DataTypes, Sequelize } from "sequelize";

export const UserRole = (Sequelize, DataTypes) => {
    const UserRole = Sequelize.define('UserRole', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //aqui se hace la referencia a la tabla que estoy llamando
            reference: {
                model: 'User',
                key: 'id'
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //aqui se hace la referencia a la tabla que estoy llamando
            reference: {
                model: 'Role',
                key: 'id'
            }
        },
    });
    return UserRole;
}