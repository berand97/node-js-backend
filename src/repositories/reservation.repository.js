import { BaseRepository } from "./base.repository.js";
import { Reservation } from "../schemas/reservation.scheme.js";
import { User } from "../schemas/user.scheme.js";
import { Department } from "../schemas/department.scheme.js";
import { Space } from "../schemas/space.scheme.js";

export class ReservationRepository extends BaseRepository {
    constructor() {
        super(Reservation);
    }

    async getAllWithDetails() {
        return await this.model.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Department, as: "department", attributes: ["id", "name"] },
                { model: Space, as: "space", attributes: ["id", "name", "capacity"] }
            ]
        });
    }

    async getByIdWithDetails(id) {
        return await this.model.findById(id, {
            include: [
                { model: User, as: "user", attributes: ["id", "name", "email"] },
                { model: Department, as: "department", attributes: ["id", "name"] },
                { model: Space, as: "space", attributes: ["id", "name", "capacity"] }
            ]
        });
    }
}
