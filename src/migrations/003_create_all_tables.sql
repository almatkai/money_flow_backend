-- Ensure the ENUM type doesn't already exist (optional, helpful for rerunning script)
DROP TYPE IF EXISTS desire_level;

-- Create ENUM type for wish desire_score
CREATE TYPE desire_level AS ENUM ('low', 'medium', 'high');

-- Create tables

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    price INTEGER,
    ticker TEXT UNIQUE, -- Added UNIQUE constraint, assuming tickers are unique
    name TEXT,
    quantity TEXT, -- Kept as TEXT per schema, consider INTEGER or NUMERIC if it represents a count
    created_date DATE DEFAULT CURRENT_DATE,
    updated_at DATE,
    last_price_update DATE
);

CREATE TABLE user_stocks (
    id SERIAL PRIMARY KEY,
    stock_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    quantity INTEGER CHECK (quantity >= 0), -- Added check for non-negative quantity
    stock_price INTEGER, -- Consider NUMERIC or DOUBLE PRECISION for monetary values
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
    -- Foreign key constraints added below
);

CREATE TABLE user_stock_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE, -- Added UNIQUE constraint
    stocks_total DOUBLE PRECISION DEFAULT 0.0,
    stocks_earning DOUBLE PRECISION DEFAULT 0.0,
    stocks_total_contributions DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
    -- Foreign key constraint added below
);

CREATE TABLE earnings_history (
    id SERIAL PRIMARY KEY, -- Assuming id should be PK, changed from NOT NULL
    user_id INTEGER NOT NULL,
    price INTEGER, -- Consider DOUBLE PRECISION or NUMERIC, and renaming to 'amount' or 'earnings'
    month INTEGER CHECK (month >= 1 AND month <= 12), -- Added CHECK constraint
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
    -- Foreign key constraint added below
);

CREATE TABLE wish (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION CHECK (price >= 0), -- Added check for non-negative price
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(100),
    desire_score desire_level -- Use the ENUM type
    -- Foreign key constraint added below
);

CREATE TABLE daily ( -- Assuming this is for daily expenses
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION CHECK (price >= 0), -- Added check for non-negative price
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(100)
    -- Foreign key constraint added below
);

CREATE TABLE bank_deposit ( -- For history/templates
    id SERIAL PRIMARY KEY,
    price DOUBLE PRECISION, -- Maybe minimum amount or template amount?
    name TEXT NOT NULL,
    percentage DOUBLE PRECISION CHECK (percentage >= 0), -- Added check
    created_date DATE DEFAULT CURRENT_DATE,
    updated_at DATE,
    last_price_update DATE -- Purpose unclear, might need renaming/rethinking
);

CREATE TABLE user_deposit (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    price DOUBLE PRECISION CHECK (price >= 0), -- Renamed from 'price' in schema to 'amount' might be clearer
    name TEXT,
    percentage DOUBLE PRECISION CHECK (percentage >= 0), -- Added check
    created_date DATE DEFAULT CURRENT_DATE,
    updated_at DATE,
    last_price_update DATE -- Purpose unclear, related to interest calculation?
    -- Foreign key constraint added below
);

CREATE TABLE user_deposit_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE, -- Added UNIQUE constraint
    deposits_total DOUBLE PRECISION DEFAULT 0.0,
    deposit_earning DOUBLE PRECISION DEFAULT 0.0,
    deposit_total_contributions DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
    -- Foreign key constraint added below
);

CREATE TABLE user_expense_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE, -- Added UNIQUE constraint
    daily_total_spent DOUBLE PRECISION DEFAULT 0.0,
    wish_total_spent DOUBLE PRECISION DEFAULT 0.0,
    total_spent DOUBLE PRECISION DEFAULT 0.0,
    average_daily_spent DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
    -- Foreign key constraint added below
);

CREATE TABLE user_general_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE, -- Added UNIQUE constraint
    current_money DOUBLE PRECISION DEFAULT 0.0,
    total_money DOUBLE PRECISION DEFAULT 0.0, -- Consider renaming to 'total_income' or similar for clarity
    average_monthly_earnings DOUBLE PRECISION DEFAULT 0.0,
    net_worth DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
    -- Foreign key constraint added below
);


-- Add Foreign Key Constraints

-- User Stocks References
ALTER TABLE user_stocks
    ADD CONSTRAINT fk_user_stocks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_user_stocks_stock FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE RESTRICT; -- Or CASCADE?

-- Earnings History References
ALTER TABLE earnings_history
    ADD CONSTRAINT fk_earnings_history_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Statistics Tables References
ALTER TABLE user_stock_statistics
    ADD CONSTRAINT fk_user_stock_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_deposit_statistics
    ADD CONSTRAINT fk_user_deposit_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_expense_statistics
    ADD CONSTRAINT fk_user_expense_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_general_statistics
    ADD CONSTRAINT fk_user_general_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Wish References
ALTER TABLE wish
    ADD CONSTRAINT fk_wish_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Daily (Expenses) References
ALTER TABLE daily
    ADD CONSTRAINT fk_daily_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- User Deposit References
ALTER TABLE user_deposit
    ADD CONSTRAINT fk_user_deposit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Optional: Add Indexes for performance on frequently queried columns (especially foreign keys)
CREATE INDEX idx_user_stocks_user_id ON user_stocks(user_id);
CREATE INDEX idx_user_stocks_stock_id ON user_stocks(stock_id);
CREATE INDEX idx_earnings_history_user_id ON earnings_history(user_id);
CREATE INDEX idx_wish_user_id ON wish(user_id);
CREATE INDEX idx_daily_user_id ON daily(user_id);
CREATE INDEX idx_user_deposit_user_id ON user_deposit(user_id);

-- Index for timestamp columns often used in WHERE clauses
CREATE INDEX idx_wish_created_at ON wish(created_at);
CREATE INDEX idx_daily_created_at ON daily(created_at);