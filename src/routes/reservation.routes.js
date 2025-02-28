import express from "express";
import ReservationController from "../controllers/reservation.controller.js";
import validateRequest from "../middlewares/validate-request.js";
import { reservationValidators } from "../utils/validators/reservation.validator.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

router.post("/", reservationValidators, validateRequest, ReservationController.createReservation);
router.get("/", ReservationController.getAllReservations);
router.get("/:id", ReservationController.getReservationById);
router.put("/:id", reservationValidators, validateRequest, ReservationController.updateReservation);
router.delete("/:id", ReservationController.deleteReservation);

router.post("/:id/approve", authenticateToken, ReservationController.approveReservation);

export default router;
