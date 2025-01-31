export class BaseRepository {
    constructor(model){
        this.model = model;
    }

    async getAll(options = {}){
        return await this.model.findAll(options);
    }

    async findById(id, options = {}){
        return await this.model.findByPK(id, options);
    }

    async create(data){
        return await this.model.create(data);
    }

    async update(id, data){
        const instance = await this.findById(id);
        if(!instance) return null;
        return await instance.update(data);
    }

    async delete(id){
        const instance = await this.findById(id);
        if(!instance) return null;
        return await instance.destroy();
    }
}