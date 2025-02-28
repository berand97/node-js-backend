import { BaseRepository } from "./base.repository.js";
import { Department } from "../schemas/department.scheme.js";

export class DepartmentRepository extends BaseRepository {
    constructor() {
        super(Department);
    }

    async getByName(name) {
        return await this.model.findOne({ where: { name } });
    }
}
