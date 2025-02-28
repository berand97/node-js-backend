import { ReservationRepository } from "../repositories/reservation.repository.js";
import { ReservationApprovalRepository } from "../repositories/reservation-approval.repository.js";

class ReservationService {
    constructor() {
        this.reservationRepository = new ReservationRepository();
        this.reservationApprovalRepository = new ReservationApprovalRepository();
    }

    async createReservation(data) {
        return await this.reservationRepository.create(data);
    }

    async getAllReservations() {
        return await this.reservationRepository.getAllWithDetails();
    }

    async getReservationById(id) {
        return await this.reservationRepository.getByIdWithDetails(id);
    }

    async updateReservation(id, data) {
        return await this.reservationRepository.update(id, data);
    }

    async deleteReservation(id) {
        return await this.reservationRepository.delete(id);
    }

    async approveReservation(reservationId, userId, status) {
        const reservation = await this.reservationRepository.getByIdWithDetails(reservationId);
        if (!reservation) return { error: "Reservación no encontrada." };

        const user = await this.userRepository.findById(userId);
        if (!user) return { error: "Usuario no encontrado." };

        if (!["approved", "rejected"].includes(status)) {
            return { error: "Estado no válido. Debe ser 'approved' o 'rejected'." };
        }

        const existingApproval = await this.reservationApprovalRepository.getApproval(reservationId, userId);
        if (existingApproval) return { error: "Ya aprobaste esta reservación." };

        await this.reservationApprovalRepository.createApproval(reservationId, userId, user.roleId, status);

        return await this.reservationRepository.update(reservationId, { status });
    }
}

export default new ReservationService();
