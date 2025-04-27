# Wish Controller Documentation

The Wish controller handles operations for managing user wishes/desired items. Each wish must be associated with a valid expense category.

## API Endpoints

### Create Wish
```bash
curl -X POST http://localhost:3000/api/1.0/wishes \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "user_id": 2,
  "name": "New Laptop",
  "price": 1200,
  "description": "MacBook Pro 14-inch",
  "link": "https://apple.com/macbook-pro",
  "image": "laptop.jpg",
  "category_id": 3,
  "desire_score": "high"
}'
```

Response (201):
```json
{
    "id": 1,
    "user_id": 2,
    "name": "New Laptop",
    "price": 1200,
    "description": "MacBook Pro 14-inch",
    "link": "https://apple.com/macbook-pro",
    "image": "laptop.jpg",
    "category_id": 3,
    "desire_score": "high",
    "created_at": "2024-04-27T10:30:00Z",
    "updated_at": "2024-04-27T10:30:00Z",
    "category": {
        "label": "Electronics",
        "value": "electronics"
    }
}
```

### Get Wishes
```bash
# Get all wishes
curl -X GET http://localhost:3000/api/1.0/wishes \
-H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get wishes for specific user
curl -X GET http://localhost:3000/api/1.0/wishes?user_id=2 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (200):
```json
[
    {
        "id": 1,
        "user_id": 2,
        "name": "New Laptop",
        "price": 1200,
        "description": "MacBook Pro 14-inch",
        "link": "https://apple.com/macbook-pro",
        "image": "laptop.jpg",
        "category_id": 3,
        "desire_score": "high",
        "created_at": "2024-04-27T10:30:00Z",
        "updated_at": "2024-04-27T10:30:00Z",
        "category": {
            "label": "Electronics",
            "value": "electronics"
        }
    }
]
```

### Update Wish
```bash
curl -X PUT http://localhost:3000/api/1.0/wishes/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
    "price": 1300,
    "name": "MacBook Pro",
    "category_id": 3
}'
```

Response (200):
```json
{
    "id": 1,
    "user_id": 2,
    "name": "MacBook Pro",
    "price": 1300,
    "description": "MacBook Pro 14-inch",
    "link": "https://apple.com/macbook-pro",
    "image": "laptop.jpg",
    "category_id": 3,
    "desire_score": "high",
    "created_at": "2024-04-27T10:30:00Z",
    "updated_at": "2024-04-27T10:35:00Z",
    "category": {
        "label": "Electronics",
        "value": "electronics"
    }
}
```

### Delete Wish
```bash
curl -X DELETE http://localhost:3000/api/1.0/wishes/1 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (200):
```json
{
    "message": "Wish deleted"
}
```

## Error Responses

### Invalid Category
```bash
curl -X POST http://localhost:3000/api/1.0/wishes \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "user_id": 2,
  "name": "New Laptop",
  "price": 1200,
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
curl -X GET http://localhost:3000/api/1.0/wishes/999 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Response (404):
```json
{
    "error": "Wish not found"
}
```

## Notes

1. The `desire_score` field accepts one of three values: 'low', 'medium', 'high'
2. Category information is always included in the response when retrieving wishes
3. When updating, category existence is verified if category_id is provided
4. All endpoints require authentication via Bearer token
