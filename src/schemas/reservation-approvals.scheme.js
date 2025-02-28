import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";
import { Reservation } from "./reservation.scheme.js";
import { Role } from "./role.scheme.js";
import { User } from "./user.scheme.js";

export const ReservationApproval = sequelize.define("ReservationApproval", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Reservation,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },
    approvedAt: {
        type: DataTypes.DATE,
    },
},
    {
        tableName: "reservation_approvals"
    }
);
