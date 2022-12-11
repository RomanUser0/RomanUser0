import { body } from 'express-validator'

export const registrValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('fullName').isLength({min: 3}),
    body('avaraturl').optional().isURL(),
]