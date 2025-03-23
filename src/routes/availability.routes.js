import express from "express";
import AvailabilityController from "../controllers/availability.controller.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de disponibilidad
router.post("/check", AvailabilityController.checkAvailability);
router.get("/space/:spaceId/calendar", AvailabilityController.getSpaceCalendar);
router.get("/space/:spaceId/slots", AvailabilityController.getAvailableSlots);
router.post("/space/unavailable", AvailabilityController.markSpaceUnavailable);
router.get("/space/:spaceId/utilization", AvailabilityController.getSpaceUtilization);

export default router; 