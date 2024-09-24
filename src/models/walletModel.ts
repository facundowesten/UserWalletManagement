import { pool } from '../config/db'; // Adjust the import path based on your project structure

interface Wallet {
    id: number;
    user_id: number;
    tag?: string;
    chain: string;
    address: string;
}

export const getWalletsByUserId = async (userId: number): Promise<Wallet[]> => {
    const query = 'SELECT * FROM wallets WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
};

export const createNewWallet = async (
    userId: number,
    tag: string | undefined,
    chain_id: number,
    address: string
): Promise<Wallet> => {
    const query = 'INSERT INTO wallets (user_id, tag, chain_id, address) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [userId, tag, chain_id, address]);
    return result.rows[0];
};

export const getWallet = async (walletId: number, userId: number): Promise<Wallet | null> => {
    const query = 'SELECT * FROM wallets WHERE id = $1 AND user_id = $2';
    const result = await pool.query(query, [walletId, userId]);
    return result.rows.length ? result.rows[0] : null;
};

export const updateWalletById = async (
    walletId: number,
    userId: number | undefined,
    tag: string | undefined,
    chain_id: number | undefined,
    address: string
): Promise<Wallet | null> => {
    const fields = [];
    const values = [];

    if (tag !== undefined) {
        fields.push(`tag = $${fields.length + 1}`);
        values.push(tag);
    }

    if (chain_id !== undefined) {
        fields.push(`chain_id = $${fields.length + 1}`);
        values.push(chain_id);
    }

    if (address !== undefined) {
        fields.push(`address = $${fields.length + 1}`);
        values.push(address);
    }

    if (fields.length === 0) {
        return null;
    }
    values.push(walletId, userId);
    const query = `
        UPDATE wallets
        SET ${fields.join(', ')}
        WHERE id = $${fields.length + 1} AND user_id = $${fields.length + 2}
        RETURNING *;
    `;
    const result = await pool.query(query, values);
    return result.rows.length ? result.rows[0] : null;
};

export const deleteWalletById = async (walletId: number, userId: number): Promise<boolean> => {
    const query = 'DELETE FROM wallets WHERE id = $1 AND user_id = $2';
    const result = await pool.query(query, [walletId, userId]);
    return result.rowCount !== null && result.rowCount > 0;
};