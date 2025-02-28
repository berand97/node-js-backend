import ReservationService from "../services/reservation.service.js";
import { reservationResponseDTO } from "../utils/dto/reservations.dto.js";

class ReservationController {
    async createReservation(req, res) {
        try {
            const reservation = await ReservationService.createReservation(req.body);
            return res.status(201).json({ message: "Reservación creada con éxito.", reservation });
        } catch (error) {
            console.error("Error creando la reservación:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getAllReservations(req, res) {
        try {
            const reservations = await ReservationService.getAllReservations();
            return res.status(200).json({ message: "Lista de reservaciones.", reservations: reservations.map(reservationResponseDTO) });
        } catch (error) {
            console.error("Error obteniendo las reservaciones:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getReservationById(req, res) {
        try {
            const reservation = await ReservationService.getReservationById(req.params.id);
            if (!reservation) {
                return res.status(404).json({ message: "Reservación no encontrada." });
            }
            return res.status(200).json(reservation);
        } catch (error) {
            console.error("Error obteniendo la reservación:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async updateReservation(req, res) {
        try {
            const updatedReservation = await ReservationService.updateReservation(req.params.id, req.body);
            if (!updatedReservation) {
                return res.status(404).json({ message: "Reservación no encontrada." });
            }
            return res.status(200).json({ message: "Reservación actualizada con éxito.", reservation: updatedReservation });
        } catch (error) {
            console.error("Error actualizando la reservación:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async deleteReservation(req, res) {
        try {
            const deletedReservation = await ReservationService.deleteReservation(req.params.id);
            if (!deletedReservation) {
                return res.status(404).json({ message: "Reservación no encontrada." });
            }
            return res.status(200).json({ message: "Reservación eliminada con éxito." });
        } catch (error) {
            console.error("Error eliminando la reservación:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async approveReservation(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const userId = req.user.userId;

            const result = await ReservationService.approveReservation(id, userId, status);
            if (result.error) {
                return res.status(400).json({ message: result.error });
            }

            return res.status(200).json({ message: "Reservación actualizada con éxito.", reservation: result });
        } catch (error) {
            console.error("Error aprobando la reservación:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}

export default new ReservationController();
