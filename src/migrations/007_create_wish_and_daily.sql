-- Create wish table
CREATE TABLE wish (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION CHECK (price >= 0),
    description varchar(255),
    link varchar(255),
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER NOT NULL,
    desire_score desire_level
);

-- Create daily table
CREATE TABLE daily (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION CHECK (price >= 0),
    description varchar(255),
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER NOT NULL
);

-- Add Foreign Key Constraints
ALTER TABLE wish
    ADD CONSTRAINT fk_wish_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE daily
    ADD CONSTRAINT fk_daily_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Add Indexes
CREATE INDEX idx_wish_user_id ON wish(user_id);
CREATE INDEX idx_daily_user_id ON daily(user_id);
CREATE INDEX idx_wish_created_at ON wish(created_at);
CREATE INDEX idx_daily_created_at ON daily(created_at);

-- Add Foreign Key Constraints for Categories
ALTER TABLE wish
    ADD CONSTRAINT fk_wish_category FOREIGN KEY (category_id) REFERENCES expense_categories(id);

ALTER TABLE daily
    ADD CONSTRAINT fk_daily_category FOREIGN KEY (category_id) REFERENCES expense_categories(id);
