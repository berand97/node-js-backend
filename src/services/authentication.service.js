import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

dotenv.config();

class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
        this.userRepository = new UserRepository();
    }

    async authenticateUser(email, password) {
        const user = await this.userRepository.getByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: "Usuario o contraseña incorrectos." };
        }


        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

        await this.authRepository.createAuthToken(user.id, accessToken, refreshToken);

        return { user, accessToken, refreshToken };
    }

    setAuthCookies(res, accessToken, refreshToken) {
        res.cookie("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 15 * 60 * 1000 });
        res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
    }

    async verifyAccessToken(token) {
        try {

            if (!process.env.JWT_SECRET) {
                throw new Error("🚨 JWT_SECRET no está definido en el entorno.");
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            return null;
        }
    }


    async validateAuthToken(userId, token) {
        try {
            const authRecord = await this.authRepository.getAuthTokenByUserId(userId);

            if (!authRecord || authRecord.token !== token) {
                return false;
            }

            if (authRecord.expirationDate < new Date()) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

}

export default new AuthService();
