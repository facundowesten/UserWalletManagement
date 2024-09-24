import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; 

const connectWithRetry = async (retries: number = MAX_RETRIES, delay: number = RETRY_DELAY): Promise<void> => {
    try {
        await pool.connect();
        console.log('Connected to the database successfully');
    } catch (error) {
        if (retries > 0) {
            console.error(`Failed to connect. Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
            setTimeout(() => connectWithRetry(retries - 1, delay * 2), delay); // Exponential backoff
        } else {
            console.error('Max retries reached. Could not connect to the database.');
            process.exit(1);
        }
    }
};

connectWithRetry();

export { pool };
