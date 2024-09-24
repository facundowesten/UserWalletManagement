import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware'; // Import your authentication middleware
import {
    getAllWallets,
    createWallet,
    getWalletById,
    updateWallet,
    deleteWallet,
} from '../controllers/walletController'; // Adjust the import based on your project structure

const router = express.Router();

// GET /wallets - Retrieve all wallets for the authenticated user
router.get('/', authMiddleware, getAllWallets);

// POST /wallets - Create a new wallet for the authenticated user
router.post('/', authMiddleware, createWallet);

// GET /wallets/:id - Retrieve details of a specific wallet by id
router.get('/:id', authMiddleware, getWalletById);

// PUT /wallets/:id - Update a wallet for the authenticated user
router.put('/:id', authMiddleware, updateWallet);

// DELETE /wallets/:id - Delete a wallet by id
router.delete('/:id', authMiddleware, deleteWallet);

export default router;