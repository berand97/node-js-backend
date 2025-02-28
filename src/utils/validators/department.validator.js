import { body } from "express-validator";

export const departmentValidators = [
    body("name")
        .notEmpty().withMessage("El nombre del departamento es obligatorio.")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres."),
];
