=-- Create ENUM type for wish desire_score
DROP TYPE IF EXISTS desire_level;
CREATE TYPE desire_level AS ENUM ('low', 'medium', 'high');

-- Create stocks table
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    price INTEGER,
    ticker TEXT UNIQUE,
    name TEXT,
    created_date DATE DEFAULT CURRENT_DATE,
    updated_at DATE,
    last_price_update DATE
);
