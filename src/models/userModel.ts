import { pool } from '../config/db'; 

interface User {
    id: number;
    email: string;
    password: string;
}

export const createUser = async (credentials: {email: string, password: string}): Promise<User> => {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [credentials.email, credentials.password]);
    return result.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows.length ? result.rows[0] : null;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows.length ? result.rows[0] : null;
};

export const updateUser = async (id: number, email: string, password: string): Promise<User | null> => {
    const query = 'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *';
    const result = await pool.query(query, [email, password, id]);
    return result.rows.length ? result.rows[0] : null;
};

export const deleteUser = async (id: number): Promise<void> => {
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [id]);
};