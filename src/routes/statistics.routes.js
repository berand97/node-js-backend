import express from "express";
import StatisticsController from "../controllers/statistics.controller.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de estadísticas
router.post("/daily", StatisticsController.generateDailyStatistics);
router.get("/space/:spaceId/department/:departmentId", StatisticsController.getStatisticsByDateRange);
router.get("/department/:departmentId", StatisticsController.getDepartmentStatistics);
router.get("/space/:spaceId", StatisticsController.getSpaceStatistics);

export default router; 