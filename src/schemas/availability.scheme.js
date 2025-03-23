import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";
import { Space } from "./space.scheme.js";

export const Availability = sequelize.define("Availability", {
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
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "availabilities"
}); 