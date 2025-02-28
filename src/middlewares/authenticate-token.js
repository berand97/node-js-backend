import dotenv from "dotenv";
import AuthService from "../services/authentication.service.js";

dotenv.config();

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
        }

        const decoded = await AuthService.verifyAccessToken(token);

        if (!decoded) {
            return res.status(401).json({ message: "Token inválido o expirado." });
        }

        const isValid = await AuthService.validateAuthToken(decoded.userId, token);

        if (!isValid) {
            return res.status(401).json({ message: "Token no válido o ha sido revocado." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};