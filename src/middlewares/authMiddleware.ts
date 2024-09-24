import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyOptions, VerifyErrors } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: number };
    }
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
    id: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        if (decoded) {
            req.user = { id: decoded.id };
            next(); 
        } else {
            return res.status(403).json({ message: 'Invalid token' });
        }
    });
};