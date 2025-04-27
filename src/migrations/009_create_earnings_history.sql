-- Create earnings_history table
CREATE TABLE earnings_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    price INTEGER,
    month INTEGER CHECK (month >= 1 AND month <= 12),
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE
);

-- Add Foreign Key Constraint
ALTER TABLE earnings_history
    ADD CONSTRAINT fk_earnings_history_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Add Index
CREATE INDEX idx_earnings_history_user_id ON earnings_history(user_id);
