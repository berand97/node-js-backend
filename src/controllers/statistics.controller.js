import StatisticsService from "../services/statistics.service.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

class StatisticsController {
    async generateDailyStatistics(req, res) {
        try {
            const { spaceId, departmentId, date } = req.body;

            const statistics = await StatisticsService.generateDailyStatistics(
                spaceId,
                departmentId,
                date
            );

            return res.status(200).json({
                message: "Estadísticas generadas exitosamente",
                statistics
            });
        } catch (error) {
            console.error("Error generando estadísticas:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getStatisticsByDateRange(req, res) {
        try {
            const { spaceId, departmentId } = req.params;
            const { startDate, endDate } = req.query;

            const statistics = await StatisticsService.getStatisticsByDateRange(
                spaceId,
                departmentId,
                startDate,
                endDate
            );

            return res.status(200).json({ statistics });
        } catch (error) {
            console.error("Error obteniendo estadísticas:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getDepartmentStatistics(req, res) {
        try {
            const { departmentId } = req.params;
            const { startDate, endDate } = req.query;

            const statistics = await StatisticsService.getDepartmentStatistics(
                departmentId,
                startDate,
                endDate
            );

            return res.status(200).json({ statistics });
        } catch (error) {
            console.error("Error obteniendo estadísticas del departamento:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getSpaceStatistics(req, res) {
        try {
            const { spaceId } = req.params;
            const { startDate, endDate } = req.query;

            const statistics = await StatisticsService.getSpaceStatistics(
                spaceId,
                startDate,
                endDate
            );

            return res.status(200).json({ statistics });
        } catch (error) {
            console.error("Error obteniendo estadísticas del espacio:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export default new StatisticsController(); 