import { BaseRepository } from "./base.repository.js";
import { User } from "../schemas/user.scheme.js";
import bcrypt from "bcryptjs";

export class UserRepository extends BaseRepository {
    constructor() {
        super(User)
    }

    async getAllActiveUsers() {
        // logica para obntener usuarios activos

    }

    async create(data) {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        return await super.create(data);
    }

    async getByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

}