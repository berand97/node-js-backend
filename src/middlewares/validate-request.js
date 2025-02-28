import { validationResult } from 'express-validator';

export default function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Errores de validación",
            errors: errors.array(),
        });
    }
    next();
}