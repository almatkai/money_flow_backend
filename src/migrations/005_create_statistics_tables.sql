-- Create user_stock_statistics table
CREATE TABLE user_stock_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    stocks_total DOUBLE PRECISION DEFAULT 0.0,
    stocks_earning DOUBLE PRECISION DEFAULT 0.0,
    stocks_total_contributions DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Create user_expense_statistics table
CREATE TABLE user_expense_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    daily_total_spent DOUBLE PRECISION DEFAULT 0.0,
    wish_total_spent DOUBLE PRECISION DEFAULT 0.0,
    total_spent DOUBLE PRECISION DEFAULT 0.0,
    average_daily_spent DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Create user_general_statistics table
CREATE TABLE user_general_statistics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    current_money DOUBLE PRECISION DEFAULT 0.0,
    total_money DOUBLE PRECISION DEFAULT 0.0,
    average_monthly_earnings DOUBLE PRECISION DEFAULT 0.0,
    net_worth DOUBLE PRECISION DEFAULT 0.0,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Add Foreign Key Constraints
ALTER TABLE user_stock_statistics
    ADD CONSTRAINT fk_user_stock_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_expense_statistics
    ADD CONSTRAINT fk_user_expense_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_general_statistics
    ADD CONSTRAINT fk_user_general_statistics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
