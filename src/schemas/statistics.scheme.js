import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";
import { Space } from "./space.scheme.js";
import { Department } from "./department.scheme.js";

export const Statistics = sequelize.define("Statistics", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    spaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Space,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    totalReservations: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    approvedReservations: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rejectedReservations: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    pendingReservations: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    averageApprovalTime: {
        type: DataTypes.INTEGER, // en minutos
        defaultValue: 0,
    },
    utilizationRate: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
}, {
    tableName: "statistics"
}); 