import { DataTypes } from "sequelize";
import  sequelize  from "../config/database.config.js";
import { User } from "./user.scheme.js";
import { Role } from "./role.scheme.js";

export const UserRole = sequelize.define(
  "UserRole",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    tableName: "user_roles",
  }
);
