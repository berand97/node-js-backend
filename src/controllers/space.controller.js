import SpaceService from "../services/space.service.js";

class SpaceController {
    async createSpace(req, res) {
        try {
            const space = await SpaceService.createSpace(req.body);
            if (space.error) {
                return res.status(400).json({ message: space.error });
            }
            return res.status(201).json({ message: "Espacio creado con éxito.", space });
        } catch (error) {
            console.error("Error creando el espacio:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getAllSpaces(req, res) {
        try {
            const spaces = await SpaceService.getAllSpaces();
            return res.status(200).json({ message: "Lista de espacios.", spaces });
        } catch (error) {
            console.error("Error obteniendo los espacios:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getSpaceById(req, res) {
        try {
            const space = await SpaceService.getSpaceById(req.params.id);
            if (!space) {
                return res.status(404).json({ message: "Espacio no encontrado." });
            }
            return res.status(200).json(space);
        } catch (error) {
            console.error("Error obteniendo el espacio:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async updateSpace(req, res) {
        try {
            const updatedSpace = await SpaceService.updateSpace(req.params.id, req.body);
            if (!updatedSpace) {
                return res.status(404).json({ message: "Espacio no encontrado." });
            }
            return res.status(200).json({ message: "Espacio actualizado con éxito.", space: updatedSpace });
        } catch (error) {
            console.error("Error actualizando el espacio:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async deleteSpace(req, res) {
        try {
            const deletedSpace = await SpaceService.deleteSpace(req.params.id);
            if (!deletedSpace) {
                return res.status(404).json({ message: "Espacio no encontrado." });
            }
            return res.status(200).json({ message: "Espacio eliminado con éxito." });
        } catch (error) {
            console.error("Error eliminando el espacio:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}

export default new SpaceController();
