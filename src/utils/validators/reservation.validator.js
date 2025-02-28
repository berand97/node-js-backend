import { body } from "express-validator";

export const reservationValidators = [
    body("eventName")
        .notEmpty().withMessage("El nombre del evento es obligatorio."),
    body("phone")
        .notEmpty().withMessage("El teléfono es obligatorio.")
        .isMobilePhone().withMessage("El teléfono debe ser válido."),
    body("numberOfPeople")
        .isInt({ min: 1 }).withMessage("El número de personas debe ser al menos 1."),
    body("reservationDate")
        .notEmpty().withMessage("La fecha de reservación es obligatoria.")
        .isISO8601().withMessage("Debe ser una fecha válida (YYYY-MM-DD)."),
    body("startTime")
        .notEmpty().withMessage("La hora de inicio es obligatoria."),
    body("endTime")
        .notEmpty().withMessage("La hora de finalización es obligatoria."),
    body("userId")
        .isInt({ min: 1 }).withMessage("El ID de usuario es obligatorio."),
    body("departmentId")
        .isInt({ min: 1 }).withMessage("El ID de departamento es obligatorio."),
    body("reservedSpaceId")
        .isInt({ min: 1 }).withMessage("El ID del espacio reservado es obligatorio."),
];
5