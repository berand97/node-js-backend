import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
    static userRepository = new UserRepository();

    static async getAllUsers(request, response) {
        try {
            const users = await this.userRepository.getAll();
            return response.status(200).json({
                message: "Lista de usuarios",
                users: users,
            });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}