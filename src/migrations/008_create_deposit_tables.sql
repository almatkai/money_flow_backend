-- Create bank_deposit table
CREATE TABLE bank_deposit (
    id SERIAL PRIMARY KEY,
    price DOUBLE PRECISION,
    name TEXT NOT NULL,
    percentage DOUBLE PRECISION CHECK (percentage >= 0),
    created_date DATE DEFAULT CURRENT_DATE,
    updated_at DATE,
    last_price_update DATE
);

-- Create user_deposit table
CREATE TABLE user_deposit (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    price DOUBLE PRECISION CHECK (price >= 0),
    name TEXT,
    percentage DOUBLE PRECISION CHECK (percentage >= 0),
    created_date DATE DEFAULT CURRENT_DATE,
    updated_at DATE,
    last_price_update DATE
);

-- Create user_deposit_statistics table
CREATE TABLE user_deposit_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    deposits_total DOUBLE PRECISION DEFAULT 0.0,
    deposit_earning DOUBLE PRECISION DEFAULT 0.0,
    deposit_total_contributions DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Add Foreign Key Constraints
ALTER TABLE user_deposit
    ADD CONSTRAINT fk_user_deposit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_deposit_statistics
    ADD CONSTRAINT fk_user_deposit_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Add Index
CREATE INDEX idx_user_deposit_user_id ON user_deposit(user_id);
