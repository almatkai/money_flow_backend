# Money Flow General api/1.0 Documentation

## Base URL
```
Development: http://localhost:3000
Production: [Your production URL]
```

---

## User Profile Endpoints

### 1. Get Current User Profile

```bash
GET /api/1.0/profile

# Headers
Authorization: Bearer <JWT_TOKEN>

# Request
curl -X GET http://localhost:3000/api/1.0/profile \
-H "Authorization: Bearer <JWT_TOKEN>"

# Success Response (200 OK)
{
  "id": 2,
  "name": "John Doe",
  "picture": "https://example.com/avatar.jpg",
  "createdAt": "2025-04-22T12:00:00Z",
  "updatedAt": "2025-04-23T12:00:00Z"
}
```

### 2. Update Current User Profile

```bash
PUT /api/1.0/profile

# Headers
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

# Request
curl -X PUT http://localhost:3000/api/1.0/profile \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "picture": "https://example.com/new-avatar.jpg"
}'

# Success Response (200 OK)
{
  "id": 2,
  "name": "Jane Doe",
  "picture": "https://example.com/new-avatar.jpg",
  "createdAt": "2025-04-22T12:00:00Z",
  "updatedAt": "2025-04-23T12:05:00Z"
}
```

---

### 1. Create User Stock

```bash
POST /api/1.0/user-stocks

# Request
curl -X POST http://localhost:3000/api/1.0/user-stocks \
-H "Content-Type: application/json" \
-d '{
  "stock_id": 1,
  "user_id": 2,
  "quantity": 10,
  "stock_price": 1500
}'

# Success Response (201 Created)
{
  "id": 1,
  "stock_id": 1,
  "user_id": 2,
  "quantity": 10,
  "stock_price": 1500,
  "created_at": "2025-04-22",
  "updated_at": null
}
```

### 2. Get User Stocks

```bash
GET /api/1.0/user-stocks?user_id=2

# Request
curl -X GET "http://localhost:3000/api/1.0/user-stocks?user_id=2"

# Success Response (200 OK)
[
  {
    "id": 1,
    "stock_id": 1,
    "user_id": 2,
    "quantity": 10,
    "stock_price": 1500,
    "created_at": "2025-04-22",
    "updated_at": null
  }
]
```

### 3. Update User Stock

```bash
PUT /api/1.0/user-stocks/1

# Request
curl -X PUT http://localhost:3000/api/1.0/user-stocks/1 \
-H "Content-Type: application/json" \
-d '{
  "stock_price": 1600,
  "name": "New Stock Name"
}'

# Success Response (200 OK)
{
  "id": 1,
  "stock_id": 1,
  "user_id": 2,
  "quantity": 10,
  "stock_price": 1600,
  "name": "New Stock Name",
  "created_at": "2025-04-22",
  "updated_at": "2025-04-23"
}
```

### 4. Delete User Stock

```bash
DELETE /api/1.0/user-stocks/1

# Request
curl -X DELETE http://localhost:3000/ap/1.0/user-stocks/1

# Success Response (200 OK)
{
  "message": "User stock deleted"
}
```

---

## Wishes Endpoints

### 1. Create Wish

```bash
POST /api/1.0/wishes

# Request
curl -X POST http://localhost:3000/api/1.0/wishes \
-H "Content-Type: application/json" \
-d '{
  "user_id": 2,
  "name": "New Laptop",
  "price": 1200,
  "description": "A powerful laptop",
  "link": "https://example.com/laptop",
  "image": "https://example.com/laptop.jpg",
  "category": "Electronics",
  "desire_score": "high"
}'

# Success Response (201 Created)
{
  "id": 1,
  "user_id": 2,
  "name": "New Laptop",
  "price": 1200,
  "description": "A powerful laptop",
  "link": "https://example.com/laptop",
  "image": "https://example.com/laptop.jpg",
  "category": "Electronics",
  "desire_score": "high",
  "created_at": "2025-04-22T12:00:00Z",
  "updated_at": "2025-04-22T12:00:00Z"
}
```

### 2. Get Wishes

```bash
GET /api/1.0/wishes?user_id=2

# Request
curl -X GET "http://localhost:3000/api/1.0/wishes?user_id=2"

# Success Response (200 OK)
[
  {
    "id": 1,
    "user_id": 2,
    "name": "New Laptop",
    "price": 1200,
    "description": "A powerful laptop",
    "link": "https://example.com/laptop",
    "image": "https://example.com/laptop.jpg",
    "category": "Electronics",
    "desire_score": "high",
    "created_at": "2025-04-22T12:00:00Z",
    "updated_at": "2025-04-22T12:00:00Z"
  }
]
```

### 3. Update Wish

```bash
PUT /api/1.0/wishes/1

# Request
curl -X PUT http://localhost:3000/api/1.0/wishes/1 \
-H "Content-Type: application/json" \
-d '{
  "price": 1100,
  "name": "Updated Laptop"
}'

# Success Response (200 OK)
{
  "id": 1,
  "user_id": 2,
  "name": "Updated Laptop",
  "price": 1100,
  "description": "A powerful laptop",
  "link": "https://example.com/laptop",
  "image": "https://example.com/laptop.jpg",
  "category": "Electronics",
  "desire_score": "high",
  "created_at": "2025-04-22T12:00:00Z",
  "updated_at": "2025-04-23T12:00:00Z"
}
```

### 4. Delete Wish

```bash
DELETE /api/1.0/wishes/1

# Request
curl -X DELETE http://localhost:3000/api/1.0/wishes/1

# Success Response (200 OK)
{
  "message": "Wish deleted"
}
```

---

## Daily Endpoints

### 1. Create Daily Record

```bash
POST /api/1.0/daily

# Request
curl -X POST http://localhost:3000/api/1.0/daily \
-H "Content-Type: application/json" \
-d '{
  "user_id": 2,
  "name": "Lunch",
  "price": 15,
  "description": "Lunch at cafe",
  "image": "https://example.com/lunch.jpg",
  "category": "Food"
}'

# Success Response (201 Created)
{
  "id": 1,
  "user_id": 2,
  "name": "Lunch",
  "price": 15,
  "description": "Lunch at cafe",
  "image": "https://example.com/lunch.jpg",
  "category": "Food",
  "created_at": "2025-04-22T12:00:00Z",
  "updated_at": "2025-04-22T12:00:00Z"
}
```

### 2. Get Daily Records

```bash
GET /api/1.0/daily?user_id=2

# Request
curl -X GET "http://localhost:3000/api/1.0/daily?user_id=2"

# Success Response (200 OK)
[
  {
    "id": 1,
    "user_id": 2,
    "name": "Lunch",
    "price": 15,
    "description": "Lunch at cafe",
    "image": "https://example.com/lunch.jpg",
    "category": "Food",
    "created_at": "2025-04-22T12:00:00Z",
    "updated_at": "2025-04-22T12:00:00Z"
  }
]
```

### 3. Update Daily Record

```bash
PUT /api/1.0/daily/1

# Request
curl -X PUT http://localhost:3000/api/1.0/daily/1 \
-H "Content-Type: application/json" \
-d '{
  "price": 18,
  "name": "Lunch with dessert"
}'

# Success Response (200 OK)
{
  "id": 1,
  "user_id": 2,
  "name": "Lunch with dessert",
  "price": 18,
  "description": "Lunch at cafe",
  "image": "https://example.com/lunch.jpg",
  "category": "Food",
  "created_at": "2025-04-22T12:00:00Z",
  "updated_at": "2025-04-23T12:00:00Z"
}
```

### 4. Delete Daily Record

```bash
DELETE /api/1.0/daily/1

# Request
curl -X DELETE http://localhost:3000/api/1.0/daily/1

# Success Response (200 OK)
{
  "message": "Daily record deleted"
}
