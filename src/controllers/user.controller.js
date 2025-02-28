import { UserRepository } from "../repositories/user.repository.js";
import { Role } from "../schemas/role.scheme.js";
import { userResponseDTO } from "../utils/dto/user.dto.js";

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser = async (req, res, next) => {
        const { name, lastName, email, password, roleId } = req.body;
        try {
            const existingUser = await this.userRepository.getByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "El usuario ya existe." });
            }
            const newUser = await this.userRepository.create({ name, lastName, email, password, roleId });
            return res.status(201).json({ message: "Usuario creado con éxito.", user: newUser });
        } catch (error) {
            next(error);
        }
    }

    getAllUsers = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: "Lista de usuarios.",
                users: (await this.userRepository.getAll({
                    include: [{ model: Role, as: "role", attributes: ["role", "id"] }]
                })).map(userResponseDTO)
            });
        } catch (error) {
            next(error);
        }
    };


    getUserById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await this.userRepository.findById(id, {
                include: [{ model: Role, as: "role", attributes: ["id", "role"] }]
            });
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req, res, next) => {
        const { id } = req.params;
        const userData = req.body;
        try {
            const updatedUser = await this.userRepository.update(id, userData);
            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }
            return res.status(200).json({ message: "Usuario actualizado con éxito.", user: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedUser = await this.userRepository.delete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }
            return res.status(200).json({ message: "Usuario eliminado con éxito." });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
