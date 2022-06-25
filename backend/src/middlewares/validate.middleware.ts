import { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";


export const loginValidation: ValidationChain[] = [
    body('email', 'Введите корректный email').isEmail().isLength({ min: 3 }).isString(),
    body('password', 'Пароль не должен быть пустым').isString().isLength({ min: 3 })
];



export const registerValidation: ValidationChain[] = [
    body('email', 'Введите корректный email').isEmail().isLength({ min: 3 }).isString(),
    body('password', 'Пароль не должен быть пустым').isLength({ min: 3 }).isString(),
    body('name', 'Имя должно состоят минимум из трех символов').isString().isLength({ min: 3 })
];

export const updateValidation: ValidationChain[] = [
    body('email', 'Введите корректный email').isEmail().isLength({ min: 3 }).isString(),
    body('name', 'Имя должно состоят минимум из трех символов').isString().isLength({ min: 3 }),
    body('surname', 'Фамилия должна состоят минимум из трех символов').isString().isLength({ min: 3 }),
    body('gender').isString().isLength({ min: 3 }),
    body('photo', "Введите корректное местонахождение фото").isString().isLength({ min: 2 })
];


export const showValidationError = (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(errors);
    }

}