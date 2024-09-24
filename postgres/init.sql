DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'user_wallet_management') THEN
        CREATE DATABASE user_wallet_management;
    END IF;
END $$;

\c user_wallet_management;


CREATE TABLE IF NOT EXISTS Users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Chains(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    symbol VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Wallets(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    tag VARCHAR(100),
    chain_id INTEGER REFERENCES Chains(id) ON DELETE SET NULL,
    address VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO Chains (name, symbol) VALUES 
('Ethereum', 'ETH'),
('Bitcoin', 'BTC'),
('Solana', 'SOL');