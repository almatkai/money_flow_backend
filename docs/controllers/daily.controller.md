# Daily Controller Documentation

The Daily controller handles operations for managing daily expenses. Each expense must be associated with a valid expense category.

## API Endpoints

### Create Daily Expense
```bash
curl -X POST http://localhost:3000/api/1.0/daily \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "user_id": 2,
  "name": "Grocery Shopping",
  "price": 75.50,
  "description": "Weekly groceries from Whole Foods",
  "image": "receipt.jpg",
  "category_id": 1
}'
```

Response (201):
```json
{
    "id": 1,
    "user_id": 2,
    "name": "Grocery Shopping",
    "price": 75.50,
    "description": "Weekly groceries from Whole Foods",
    "image": "receipt.jpg",
    "category_id": 1,
    "created_at": "2024-04-27T10:30:00Z",
    "updated_at": "2024-04-27T10:30:00Z",
    "category": {
        "label": "Food",
        "value": "food"
    }
}
```

### Get Daily Expenses
```bash
# Get all daily expenses
curl -X GET http://localhost:3000/api/1.0/daily \
-H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get daily expenses for specific user
curl -X GET http://localhost:3000/api/1.0/daily?user_id=2 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (200):
```json
[
    {
        "id": 1,
        "user_id": 2,
        "name": "Grocery Shopping",
        "price": 75.50,
        "description": "Weekly groceries from Whole Foods",
        "image": "receipt.jpg",
        "category_id": 1,
        "created_at": "2024-04-27T10:30:00Z",
        "updated_at": "2024-04-27T10:30:00Z",
        "category": {
            "label": "Food",
            "value": "food"
        }
    }
]
```

### Update Daily Expense
```bash
curl -X PUT http://localhost:3000/api/1.0/daily/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
    "price": 82.50,
    "name": "Groceries",
    "category_id": 1
}'
```

Response (200):
```json
{
    "id": 1,
    "user_id": 2,
    "name": "Groceries",
    "price": 82.50,
    "description": "Weekly groceries from Whole Foods",
    "image": "receipt.jpg",
    "category_id": 1,
    "created_at": "2024-04-27T10:30:00Z",
    "updated_at": "2024-04-27T10:35:00Z",
    "category": {
        "label": "Food",
        "value": "food"
    }
}
```

### Delete Daily Expense
```bash
curl -X DELETE http://localhost:3000/api/1.0/daily/1 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (200):
```json
{
    "message": "Daily record deleted"
}
```

## Error Responses

### Invalid Category
```bash
curl -X POST http://localhost:3000/api/1.0/daily \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "user_id": 2,
  "name": "Groceries",
  "price": 75.50,
  "category_id": 999
}'
```

Response (400):
```json
{
    "error": "Invalid category_id"
}
```

### Not Found
```bash
curl -X GET http://localhost:3000/api/1.0/daily/999 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (404):
```json
{
    "error": "Daily record not found"
}
```

## Notes

1. Category information is always included in the response when retrieving daily expenses
2. When updating, category existence is verified if category_id is provided
3. All endpoints require authentication via Bearer token
4. Available categories can be found in the expense_categories table
