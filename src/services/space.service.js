import { SpaceRepository } from "../repositories/space.repository.js";

class SpaceService {
    constructor() {
        this.spaceRepository = new SpaceRepository();
    }

    async createSpace(data) {
        const existingSpace = await this.spaceRepository.getByName(data.name);
        if (existingSpace) {
            return { error: "El espacio ya existe." };
        }
        return await this.spaceRepository.create(data);
    }

    async getAllSpaces() {
        return await this.spaceRepository.getAll();
    }

    async getSpaceById(id) {
        return await this.spaceRepository.findById(id);
    }

    async updateSpace(id, data) {
        return await this.spaceRepository.update(id, data);
    }

    async deleteSpace(id) {
        return await this.spaceRepository.delete(id);
    }
}

export default new SpaceService();
