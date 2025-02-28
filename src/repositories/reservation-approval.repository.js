import { BaseRepository } from "./base.repository.js";
import { ReservationApproval } from "../schemas/reservation-approvals.scheme.js";

export class ReservationApprovalRepository extends BaseRepository {
    constructor() {
        super(ReservationApproval);
    }

    async getApproval(reservationId, userId) {
        return await this.model.findOne({ where: { reservationId, userId } });
    }

    async createApproval(reservationId, userId, roleId, status) {
        return await this.create({ reservationId, userId, roleId, status });
    }
}
