CREATE TABLE IF NOT EXISTS expense_categories (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL UNIQUE
);

-- 2) Seed with your TS categories
INSERT INTO expense_categories (label, value) VALUES
    ('Food', 'food'),
    ('Transport', 'transport'),
    ('Shopping', 'shopping'),
    ('Health', 'health'),
    ('Bills', 'bills'),
    ('Entertainment', 'entertainment'),
    ('Online Subscription', 'online_subscription'),
    ('Other', 'other');