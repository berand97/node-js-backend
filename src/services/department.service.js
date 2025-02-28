import { DepartmentRepository } from "../repositories/department.repository.js";

class DepartmentService {
    constructor() {
        this.departmentRepository = new DepartmentRepository();
    }

    async createDepartment(data) {
        const existingDepartment = await this.departmentRepository.getByName(data.name);
        if (existingDepartment) {
            return { error: "El departamento ya existe." };
        }
        return await this.departmentRepository.create(data);
    }

    async getAllDepartments() {
        return await this.departmentRepository.getAll();
    }

    async getDepartmentById(id) {
        return await this.departmentRepository.findById(id);
    }

    async updateDepartment(id, data) {
        return await this.departmentRepository.update(id, data);
    }

    async deleteDepartment(id) {
        return await this.departmentRepository.delete(id);
    }
}

export default new DepartmentService();
