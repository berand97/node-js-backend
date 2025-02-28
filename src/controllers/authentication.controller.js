import AuthService from "../services/authentication.service.js";
import { userResponseDTO } from "../utils/dto/user.dto.js";

class AuthenticationController {
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken, error } = await AuthService.authenticateUser(email, password);

            if (error) {
                return res.status(401).json({ message: error });
            }

            AuthService.setAuthCookies(res, accessToken, refreshToken);

            return res.status(200).json({
                message: "Inicio de sesión exitoso.",
                user: userResponseDTO(user)
            });

        } catch (error) {
            console.error("Error en el login:", error);
            return res.status(500).json({ message: "Error en la autenticación." });
        }
    };
}

export default new AuthenticationController();