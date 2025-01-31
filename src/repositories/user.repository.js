import { BaseRepository } from "./base.repository.js";
import { User } from "../schemas/user.scheme.js";

export class UserRepository extends BaseRepository {
    constructor(){
        super(User)
    }

}