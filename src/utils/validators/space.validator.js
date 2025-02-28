import { body } from "express-validator";

export const spaceValidators = [
    body("name")
        .notEmpty().withMessage("El nombre del espacio es obligatorio.")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres."),
    body("capacity")
        .isInt({ min: 1 }).withMessage("La capacidad debe ser un número entero positivo."),
    body("description")
        .optional()
        .isString().withMessage("La descripción debe ser una cadena de texto.")
];
