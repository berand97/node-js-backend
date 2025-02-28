import { body } from 'express-validator';

export const userValidators = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio'),
    body('email')
        .isEmail().withMessage('El email no es válido')
        .notEmpty().withMessage('El email es obligatorio'),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    body('roleId')
        .notEmpty().withMessage('El roleId es obligatorio')
];