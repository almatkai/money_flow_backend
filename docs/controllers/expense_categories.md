# Expense Categories Documentation

Expense categories are used to categorize both daily expenses and wishes. Each expense/wish must reference a valid category ID.

## API Endpoints

### Get All Categories
```bash
curl -X GET http://localhost:3000/api/1.0/categories \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (200):
```json
[
    {
        "id": 1,
        "label": "Food",
        "value": "food"
    },
    {
        "id": 2,
        "label": "Transport",
        "value": "transport"
    },
    {
        "id": 3,
        "label": "Shopping",
        "value": "shopping"
    },
    {
        "id": 4,
        "label": "Health",
        "value": "health"
    },
    {
        "id": 5,
        "label": "Bills",
        "value": "bills"
    },
    {
        "id": 6,
        "label": "Entertainment",
        "value": "entertainment"
    },
    {
        "id": 7,
        "label": "Online Subscription",
        "value": "online_subscription"
    },
    {
        "id": 8,
        "label": "Other",
        "value": "other"
    }
]
```

### Get Category by ID
```bash
curl -X GET http://localhost:3000/api/1.0/categories/1 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (200):
```json
{
    "id": 1,
    "label": "Food",
    "value": "food"
}
```

## Database Schema

```sql
CREATE TABLE expense_categories (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL UNIQUE
);
```

## Using Categories in Requests

When creating or updating wishes or daily expenses, include the category_id in your request:

### Example: Create Daily Expense with Category
```bash
curl -X POST http://localhost:3000/api/1.0/daily \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
    "name": "Dinner",
    "price": 25.99,
    "category_id": 1  # Food category
}'
```

### Example: Create Wish with Category
```bash
curl -X POST http://localhost:3000/api/1.0/wishes \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
    "name": "Netflix Subscription",
    "price": 15.99,
    "category_id": 7  # Online Subscription category
}'
```

## Error Handling

### Invalid Category ID
```bash
curl -X POST http://localhost:3000/api/1.0/daily \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
    "name": "Dinner",
    "price": 25.99,
    "category_id": 999  # Invalid ID
}'
```

Response (400):
```json
{
    "error": "Invalid category_id"
}
```

## Default Categories

| ID | Label | Value | Description |
|----|-------|-------|-------------|
| 1 | Food | food | Food and groceries |
| 2 | Transport | transport | Transportation expenses |
| 3 | Shopping | shopping | General shopping |
| 4 | Health | health | Health-related expenses |
| 5 | Bills | bills | Regular bills and utilities |
| 6 | Entertainment | entertainment | Entertainment expenses |
| 7 | Online Subscription | online_subscription | Subscription services |
| 8 | Other | other | Miscellaneous expenses |

## Notes

1. Categories must be created in the database before they can be used
2. Category IDs are referenced by both wish and daily expense tables
3. The category information is included in responses when fetching wishes or daily expenses
4. Invalid category IDs will result in a 400 Bad Request error
