# CRUD Operations Example

This document provides a standardized example of CRUD (Create, Read, Update, Delete) operations in our application.

## Controller Structure

```javascript
const ExampleService = require('../services/example.service');

class ExampleController {
    async create(req, res) {
        try {
            const data = await ExampleService.create(req.body);
            return res.status(201).json(data);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const items = await ExampleService.getAll();
            return res.status(200).json(items);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const item = await ExampleService.getById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            return res.status(200).json(item);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await ExampleService.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ message: 'Item not found' });
            }
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await ExampleService.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Item not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ExampleController();
```

## Service Structure

```javascript
const db = require('../config/database');

class ExampleService {
    async create(data) {
        const query = `
            INSERT INTO example_table (field1, field2)
            VALUES ($1, $2)
            RETURNING *
        `;
        const values = [data.field1, data.field2];
        
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async getAll() {
        const query = 'SELECT * FROM example_table';
        const result = await db.query(query);
        return result.rows;
    }

    async getById(id) {
        const query = 'SELECT * FROM example_table WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    async update(id, data) {
        const query = `
            UPDATE example_table
            SET field1 = $1, field2 = $2
            WHERE id = $3
            RETURNING *
        `;
        const values = [data.field1, data.field2, id];
        
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM example_table WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new ExampleService();
```

## Route Structure

```javascript
const router = require('express').Router();
const ExampleController = require('../controllers/example.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, ExampleController.create);
router.get('/', authMiddleware, ExampleController.getAll);
router.get('/:id', authMiddleware, ExampleController.getById);
router.put('/:id', authMiddleware, ExampleController.update);
router.delete('/:id', authMiddleware, ExampleController.delete);

module.exports = router;
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/example | Create new item |
| GET    | /api/example | Get all items |
| GET    | /api/example/:id | Get item by ID |
| PUT    | /api/example/:id | Update item |
| DELETE | /api/example/:id | Delete item |

## Request/Response Examples

### Create Item
```http
POST /api/example
Authorization: Bearer <token>
Content-Type: application/json

{
    "field1": "value1",
    "field2": "value2"
}
```

Response (201):
```json
{
    "id": 1,
    "field1": "value1",
    "field2": "value2",
    "created_at": "2024-04-27T10:30:00Z"
}
```

### Get All Items
```http
GET /api/example
Authorization: Bearer <token>
```

Response (200):
```json
[
    {
        "id": 1,
        "field1": "value1",
        "field2": "value2",
        "created_at": "2024-04-27T10:30:00Z"
    }
]
```

### Get Item by ID
```http
GET /api/example/1
Authorization: Bearer <token>
```

Response (200):
```json
{
    "id": 1,
    "field1": "value1",
    "field2": "value2",
    "created_at": "2024-04-27T10:30:00Z"
}
```

### Update Item
```http
PUT /api/example/1
Authorization: Bearer <token>
Content-Type: application/json

{
    "field1": "new_value1",
    "field2": "new_value2"
}
```

Response (200):
```json
{
    "id": 1,
    "field1": "new_value1",
    "field2": "new_value2",
    "updated_at": "2024-04-27T10:35:00Z"
}
```

### Delete Item
```http
DELETE /api/example/1
Authorization: Bearer <token>
```

Response (204): No Content
