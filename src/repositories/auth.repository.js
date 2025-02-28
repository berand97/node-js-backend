import { BaseRepository } from "./base.repository.js";
import { Auth } from "../schemas/auth.scheme.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthRepository extends BaseRepository {
    constructor() {
        super(Auth);
    }

    async createAuthToken(userId, accessToken, refreshToken) {
        const expirationDate = new Date(Date.now() + 60 * 60 * 1000);

        const existingAuth = await this.model.findOne({ where: { userId } });
        if (existingAuth) {
            await existingAuth.update({ token: accessToken, refreshToken, expirationDate });
        } else {
            await this.create({ userId, token: accessToken, refreshToken, expirationDate });
        }
        return { accessToken, refreshToken };
    }


    async getAuthTokenByUserId(userId) {
        return await this.model.findOne({ where: { userId } });
    }

    async deleteAuthToken(userId) {
        return await this.model.destroy({ where: { userId } });
    }
}