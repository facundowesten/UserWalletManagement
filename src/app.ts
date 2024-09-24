import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/walletRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
