import { UserModel } from "../models/user.model.js";

export class AuthenticationController {
  static async getAllUsers(request, response) {

    const users = await UserModel.getAllUsers();

    if(users.length === 0) {
      return response.status(404).json({ error: "No hay usuarios registrados" });
    }

    return response.status(200).json({
      message: "Lista de usuarios",
      users: users,
    });
  }


  static async login(request, response) {
    const { user, password } = request.body;

    const validations = UserModel.validateFields(user, password);

    if (!validations.isValid) {
      return response.status(400).json({ error: validations.errors });
    }

    response.json({ message: "Usuario registrado" });
  }
}
