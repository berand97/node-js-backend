import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

export const Space = sequelize.define("Space", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
},
    {
        tableName: "spaces"
    }
);