-- Create user_stocks table
CREATE TABLE user_stocks (
    id SERIAL PRIMARY KEY,
    stock_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    quantity INTEGER CHECK (quantity >= 0),
    stock_price INTEGER,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Add Foreign Key Constraints
ALTER TABLE user_stocks
    ADD CONSTRAINT fk_user_stocks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_user_stocks_stock FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE RESTRICT;

-- Add Indexes
CREATE INDEX idx_user_stocks_user_id ON user_stocks(user_id);
CREATE INDEX idx_user_stocks_stock_id ON user_stocks(stock_id);
