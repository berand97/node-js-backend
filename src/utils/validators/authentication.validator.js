import { body } from 'express-validator';

export const loginValidators = [
    body('email')
        .isEmail().withMessage('El email no es válido')
        .notEmpty().withMessage('El email es obligatorio'),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .notEmpty().withMessage('La contraseña es obligatoria')
];