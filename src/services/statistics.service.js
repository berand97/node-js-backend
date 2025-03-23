import { Statistics } from "../schemas/statistics.scheme.js";
import { Reservation } from "../schemas/reservation.scheme.js";
import { ReservationApproval } from "../schemas/reservation-approvals.scheme.js";
import { Op } from "sequelize";

class StatisticsService {
    async generateDailyStatistics(spaceId, departmentId, date) {
        const reservations = await Reservation.findAll({
            where: {
                reservedSpaceId: spaceId,
                departmentId: departmentId,
                reservationDate: date
            }
        });

        const approvals = await ReservationApproval.findAll({
            where: {
                reservationId: reservations.map(r => r.id)
            }
        });

        const stats = {
            totalReservations: reservations.length,
            approvedReservations: reservations.filter(r => r.status === "approved").length,
            rejectedReservations: reservations.filter(r => r.status === "rejected").length,
            pendingReservations: reservations.filter(r => r.status === "pending").length,
            averageApprovalTime: this.calculateAverageApprovalTime(approvals),
            utilizationRate: await this.calculateUtilizationRate(spaceId, date)
        };

        // Guardar estadísticas
        await Statistics.create({
            spaceId,
            departmentId,
            date,
            ...stats
        });

        return stats;
    }

    async getStatisticsByDateRange(spaceId, departmentId, startDate, endDate) {
        return await Statistics.findAll({
            where: {
                spaceId,
                departmentId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['date', 'ASC']]
        });
    }

    async getDepartmentStatistics(departmentId, startDate, endDate) {
        const reservations = await Reservation.findAll({
            where: {
                departmentId,
                reservationDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        return {
            totalReservations: reservations.length,
            approvedReservations: reservations.filter(r => r.status === "approved").length,
            rejectedReservations: reservations.filter(r => r.status === "rejected").length,
            pendingReservations: reservations.filter(r => r.status === "pending").length,
            approvalRate: (reservations.filter(r => r.status === "approved").length / reservations.length) * 100
        };
    }

    async getSpaceStatistics(spaceId, startDate, endDate) {
        const reservations = await Reservation.findAll({
            where: {
                reservedSpaceId: spaceId,
                reservationDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const utilization = await this.calculateUtilizationRate(spaceId, startDate, endDate);

        return {
            totalReservations: reservations.length,
            approvedReservations: reservations.filter(r => r.status === "approved").length,
            rejectedReservations: reservations.filter(r => r.status === "rejected").length,
            pendingReservations: reservations.filter(r => r.status === "pending").length,
            utilizationRate: utilization
        };
    }

    calculateAverageApprovalTime(approvals) {
        if (approvals.length === 0) return 0;

        const totalTime = approvals.reduce((acc, approval) => {
            const created = new Date(approval.createdAt);
            const approved = new Date(approval.approvedAt);
            return acc + (approved - created);
        }, 0);

        return Math.round(totalTime / (approvals.length * 60 * 1000)); // Convertir a minutos
    }

    async calculateUtilizationRate(spaceId, date) {
        const reservations = await Reservation.findAll({
            where: {
                reservedSpaceId: spaceId,
                reservationDate: date,
                status: "approved"
            }
        });

        const totalHours = 12; // 8 AM - 8 PM
        const reservedHours = reservations.reduce((acc, reservation) => {
            const start = new Date(`1970-01-01T${reservation.startTime}`);
            const end = new Date(`1970-01-01T${reservation.endTime}`);
            const hours = (end - start) / (1000 * 60 * 60);
            return acc + hours;
        }, 0);

        return (reservedHours / totalHours) * 100;
    }
}

export default new StatisticsService(); 