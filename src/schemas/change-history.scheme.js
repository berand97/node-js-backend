import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

export const ChangeHistory = sequelize.define("ChangeHistory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    action: {
        type: DataTypes.ENUM("creation", "modification", "cancellation"),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    changeDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        tableName: "change_histories"
    }
);