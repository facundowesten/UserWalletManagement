import { Request, Response } from 'express';
import {
    getWalletsByUserId,
    createNewWallet,
    getWallet,
    updateWalletById,
    deleteWalletById,
} from '../models/walletModel';

export const getAllWallets = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id; 

    try {
        const wallets = await getWalletsByUserId(userId);
        return res.status(200).json(wallets);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const createWallet = async (req: Request, res: Response) => {
    const userId = req.user!.id; // Get user ID from the JWT
    const { tag, chain_id, address } = req.body;

    try {
        if(!tag || !chain_id || !address) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const newWallet = await createNewWallet(userId, tag, chain_id, address);
        return res.status(201).json(newWallet);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getWalletById = async (req: Request, res: Response) => {
    const userId = req.user!.id; // Get user ID from the JWT
    const walletId = parseInt(req.params.id, 10);

    try {
        if(!walletId) {
            return res.status(400).json({ message: 'Wallet ID is required' });
        }
        const wallet = await getWallet(walletId, userId);
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        return res.status(200).json(wallet);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const updateWallet = async (req: Request, res: Response) => {
    const userId = req.user!.id; // Get user ID from the JWT
    const walletId = parseInt(req.params.id, 10);
    const { tag, chain_id, address } = req.body;

    try {
        if(!walletId) {
            return res.status(400).json({ message: 'Wallet ID is required' });
        }
        if(!tag && !chain_id && !address) {
            return res.status(400).json({ message: 'Please provide at least one field to update' });
        }
        const updatedWallet = await updateWalletById(walletId, userId, tag, chain_id, address);
        if (!updatedWallet) {
            return res.status(404).json({ message: 'Wallet not found or not authorized' });
        }
        return res.status(200).json(updatedWallet);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const deleteWallet = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const walletId = parseInt(req.params.id, 10);

    try {
        if(!walletId) {
            return res.status(400).json({ message: 'Wallet ID is required' });
        }
        const result = await deleteWalletById(walletId, userId);
        if (!result) {
            return res.status(404).json({ message: 'Wallet not found or not authorized' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};