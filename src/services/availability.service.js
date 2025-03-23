import { Availability } from "../schemas/availability.scheme.js";
import { Reservation } from "../schemas/reservation.scheme.js";
import { Op } from "sequelize";

class AvailabilityService {
    async checkAvailability(spaceId, date, startTime, endTime) {
        // Verificar si hay reservaciones existentes
        const existingReservation = await Reservation.findOne({
            where: {
                reservedSpaceId: spaceId,
                reservationDate: date,
                status: "approved",
                [Op.or]: [
                    {
                        startTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        endTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    }
                ]
            }
        });

        return !existingReservation;
    }

    async getSpaceCalendar(spaceId, startDate, endDate) {
        const reservations = await Reservation.findAll({
            where: {
                reservedSpaceId: spaceId,
                reservationDate: {
                    [Op.between]: [startDate, endDate]
                },
                status: "approved"
            },
            order: [['reservationDate', 'ASC'], ['startTime', 'ASC']]
        });

        return reservations;
    }

    async getAvailableSlots(spaceId, date) {
        // Obtener todas las reservaciones aprobadas para ese día
        const reservations = await Reservation.findAll({
            where: {
                reservedSpaceId: spaceId,
                reservationDate: date,
                status: "approved"
            },
            order: [['startTime', 'ASC']]
        });

        // Generar slots disponibles (por defecto de 1 hora)
        const slots = [];
        const startHour = 8; // Hora de inicio (8 AM)
        const endHour = 20;   // Hora de fin (8 PM)

        for (let hour = startHour; hour < endHour; hour++) {
            const slotStart = `${hour.toString().padStart(2, '0')}:00:00`;
            const slotEnd = `${(hour + 1).toString().padStart(2, '0')}:00:00`;

            // Verificar si el slot está disponible
            const isAvailable = !reservations.some(reservation => {
                return (slotStart >= reservation.startTime && slotStart < reservation.endTime) ||
                    (slotEnd > reservation.startTime && slotEnd <= reservation.endTime);
            });

            if (isAvailable) {
                slots.push({
                    startTime: slotStart,
                    endTime: slotEnd,
                    isAvailable: true
                });
            }
        }

        return slots;
    }

    async markSpaceUnavailable(spaceId, date, startTime, endTime, reason) {
        return await Availability.create({
            spaceId,
            date,
            startTime,
            endTime,
            isAvailable: false,
            reason
        });
    }

    async getSpaceUtilization(spaceId, startDate, endDate) {
        const reservations = await Reservation.findAll({
            where: {
                reservedSpaceId: spaceId,
                reservationDate: {
                    [Op.between]: [startDate, endDate]
                },
                status: "approved"
            }
        });

        const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalHours = totalDays * 12; // 12 horas por día (8 AM - 8 PM)
        const reservedHours = reservations.reduce((acc, reservation) => {
            const start = new Date(`1970-01-01T${reservation.startTime}`);
            const end = new Date(`1970-01-01T${reservation.endTime}`);
            const hours = (end - start) / (1000 * 60 * 60);
            return acc + hours;
        }, 0);

        return {
            totalHours,
            reservedHours,
            utilizationRate: (reservedHours / totalHours) * 100
        };
    }
}

export default new AvailabilityService(); 