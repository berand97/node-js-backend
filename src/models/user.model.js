
export class UserModel {
  static validate(user) {
    if (user.length < 3) {
      return "Usuario no válido";
    }
  }
}