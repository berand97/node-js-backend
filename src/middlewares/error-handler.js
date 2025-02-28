import { ValidationError } from 'sequelize';

export default function errorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        const errors = err.errors.map(error => ({
            field: error.path,
            message: error.message,
        }));
        return res.status(400).json({
            message: "Errores de validación",
            errors,
        });
    }
    return res.status(500).json({
        message: "Error interno del servidor",
    });
}