import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail, createUser } from '../models/userModel';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({ email, password: hashedPassword });

        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};