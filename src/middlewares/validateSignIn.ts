import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateSignIn = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .notEmpty()
        .withMessage('Email is required.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .notEmpty()
        .withMessage('Password is required.'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        next(); 
    }
];