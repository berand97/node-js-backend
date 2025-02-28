export * from './auth.scheme.js';
export * from './change-history.scheme.js';
export * from './department.scheme.js';
export * from './reservation-status.scheme.js';
export * from './reservation.scheme.js';
export * from './role.scheme.js';
export * from './space.scheme.js';
export * from './user-role.scheme.js';
export * from './user.scheme.js';
export * from './reservation-approvals.scheme.js';

import sequelize from '../config/database.config.js';
import { User } from './user.scheme.js';
import { Reservation } from './reservation.scheme.js';
import { Department } from './department.scheme.js';
import { Space } from './space.scheme.js';
import { ReservationStatus } from './reservation-status.scheme.js';
import { ChangeHistory } from './change-history.scheme.js';
import { Role } from './role.scheme.js';
import { UserRole } from './user-role.scheme.js';
import { ReservationApproval } from './reservation-approvals.scheme.js';

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

User.hasMany(Reservation, { foreignKey: "userId", as: "reservations" });
Reservation.belongsTo(User, { foreignKey: "userId", as: "user" });

Department.hasMany(Reservation, { foreignKey: "departmentId", as: "reservations" });
Reservation.belongsTo(Department, { foreignKey: "departmentId", as: "department" });

Space.hasMany(Reservation, { foreignKey: "reservedSpaceId", as: "reservations" });
Reservation.belongsTo(Space, { foreignKey: "reservedSpaceId", as: "space" });

Reservation.hasMany(ChangeHistory, { foreignKey: "reservationId", as: "changeHistory" });
ChangeHistory.belongsTo(Reservation, { foreignKey: "reservationId", as: "reservation" });

Reservation.hasMany(ReservationApproval, { foreignKey: "reservationId", as: "approvals" });
ReservationApproval.belongsTo(Reservation, { foreignKey: "reservationId", as: "reservation" });

Role.hasMany(ReservationApproval, { foreignKey: "roleId", as: "approvals" });
ReservationApproval.belongsTo(Role, { foreignKey: "roleId", as: "role" });

User.hasMany(ReservationApproval, { foreignKey: "userId", as: "approvals" });
ReservationApproval.belongsTo(User, { foreignKey: "userId", as: "user" });

export {
    sequelize,
    User,
    Reservation,
    Department,
    Space,
    ReservationStatus,
    ChangeHistory,
    Role,
    UserRole,
    ReservationApproval,
};
