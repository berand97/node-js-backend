import { BaseRepository } from "./base.repository.js";
import { User } from "../schemas/user.scheme.js";

export class UserRepository extends BaseRepository {
    constructor(){
        super(User)
    }

    async getAllActivceUsers () {
        // logica para obntener usuarios activos
        
    }

    // obtener todos los usuarios que se encuentren activos en la plataforma 



}