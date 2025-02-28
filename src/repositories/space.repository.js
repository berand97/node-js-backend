import { BaseRepository } from "./base.repository.js";
import { Space } from "../schemas/space.scheme.js";

export class SpaceRepository extends BaseRepository {
    constructor() {
        super(Space);
    }

    async getByName(name) {
        return await this.model.findOne({ where: { name } });
    }
}
