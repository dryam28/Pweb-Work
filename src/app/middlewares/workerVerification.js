import { body } from "express-validator";

const workerValidator = [
    body('email', 'Formato de correo incorrecto').trim().notEmpty().isEmail().normalizeEmail(),
    body('name', 'No pueden haber campos vacíos')
        .trim()
        .notEmpty(),
    body('lastName', 'No pueden haber campos vacíos').trim()
        .notEmpty(),
    body('age').trim()
        .notEmpty().withMessage('No pueden haber campos vacíos')
        .isNumeric().withMessage('La edad tiene que ser un número'),
    body('ci').trim()
        .notEmpty().withMessage('No pueden haber campos vacíos')
        .isLength({ min: 11, max: 11 }).withMessage('El carne de identidad debe tener 11 números'),
    body('teachingCategory', 'No pueden haber campos vacíos').trim()
        .notEmpty(),
    body('scientificDegree', 'No pueden haber campos vacíos').trim()
        .notEmpty(),
    body('speciality', 'No pueden haber campos vacíos').trim()
        .notEmpty(),
    body('charge', 'No pueden haber campos vacíos').trim()
        .notEmpty(),
];

export {
    workerValidator
}