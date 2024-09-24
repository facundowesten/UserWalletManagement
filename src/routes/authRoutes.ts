import express from 'express';
import { signIn, register } from '../controllers/authController';
import { validateSignIn } from '../middlewares/validateSignIn'; // Assuming you have a validation function

const router = express.Router();

// POST /signin: Sign in a user
router.post('/signin', validateSignIn, signIn);

// POST /signup: Sign up a user
router.post('/signup', validateSignIn, register);

export default router;