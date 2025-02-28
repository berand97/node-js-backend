import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

export const ReservationStatus = sequelize.define("ReservationStatus", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},
    {
        tableName: "reservation_statuses"
    }
);