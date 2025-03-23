import AvailabilityService from "../services/availability.service.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

class AvailabilityController {
    async checkAvailability(req, res) {
        try {
            const { spaceId, date, startTime, endTime } = req.body;
            const isAvailable = await AvailabilityService.checkAvailability(
                spaceId,
                date,
                startTime,
                endTime
            );

            return res.status(200).json({
                isAvailable,
                message: isAvailable ? "El espacio está disponible" : "El espacio no está disponible"
            });
        } catch (error) {
            console.error("Error verificando disponibilidad:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getSpaceCalendar(req, res) {
        try {
            const { spaceId } = req.params;
            const { startDate, endDate } = req.query;

            const calendar = await AvailabilityService.getSpaceCalendar(
                spaceId,
                startDate,
                endDate
            );

            return res.status(200).json({ calendar });
        } catch (error) {
            console.error("Error obteniendo calendario:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getAvailableSlots(req, res) {
        try {
            const { spaceId } = req.params;
            const { date } = req.query;

            const slots = await AvailabilityService.getAvailableSlots(spaceId, date);

            return res.status(200).json({ slots });
        } catch (error) {
            console.error("Error obteniendo slots disponibles:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async markSpaceUnavailable(req, res) {
        try {
            const { spaceId, date, startTime, endTime, reason } = req.body;

            const result = await AvailabilityService.markSpaceUnavailable(
                spaceId,
                date,
                startTime,
                endTime,
                reason
            );

            return res.status(201).json({
                message: "Espacio marcado como no disponible",
                availability: result
            });
        } catch (error) {
            console.error("Error marcando espacio como no disponible:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getSpaceUtilization(req, res) {
        try {
            const { spaceId } = req.params;
            const { startDate, endDate } = req.query;

            const utilization = await AvailabilityService.getSpaceUtilization(
                spaceId,
                startDate,
                endDate
            );

            return res.status(200).json({ utilization });
        } catch (error) {
            console.error("Error obteniendo utilización del espacio:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export default new AvailabilityController(); 