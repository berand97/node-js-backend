import DepartmentService from "../services/department.service.js";

class DepartmentController {
    async createDepartment(req, res) {
        try {
            const department = await DepartmentService.createDepartment(req.body);
            if (department.error) {
                return res.status(400).json({ message: department.error });
            }
            return res.status(201).json({ message: "Departamento creado con éxito.", department });
        } catch (error) {
            console.error("Error creando el departamento:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getAllDepartments(req, res) {
        try {
            const departments = await DepartmentService.getAllDepartments();
            return res.status(200).json({ message: "Lista de departamentos.", departments });
        } catch (error) {
            console.error("Error obteniendo los departamentos:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const department = await DepartmentService.getDepartmentById(req.params.id);
            if (!department) {
                return res.status(404).json({ message: "Departamento no encontrado." });
            }
            return res.status(200).json(department);
        } catch (error) {
            console.error("Error obteniendo el departamento:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async updateDepartment(req, res) {
        try {
            const updatedDepartment = await DepartmentService.updateDepartment(req.params.id, req.body);
            if (!updatedDepartment) {
                return res.status(404).json({ message: "Departamento no encontrado." });
            }
            return res.status(200).json({ message: "Departamento actualizado con éxito.", department: updatedDepartment });
        } catch (error) {
            console.error("Error actualizando el departamento:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const deletedDepartment = await DepartmentService.deleteDepartment(req.params.id);
            if (!deletedDepartment) {
                return res.status(404).json({ message: "Departamento no encontrado." });
            }
            return res.status(200).json({ message: "Departamento eliminado con éxito." });
        } catch (error) {
            console.error("Error eliminando el departamento:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}

export default new DepartmentController();
