# Money Flow API Documentation

## Base URL
```
Development: http://localhost:3000
Production: [Your production URL]
```

## Authentication Endpoints

### 1. Register User
Register a new user and send verification email.

```bash
POST /api/auth/register

# Request
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}'

# Success Response (200 OK)
{
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  }
}

# Error Response (400 Bad Request)
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 2. Login
Authenticate user and receive JWT token.

```bash
POST /api/auth/login

# Request
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123"
}'

# Success Response (200 OK)
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  }
}

# Error Response (403 Forbidden) - Email Not Verified
{
  "message": "Please verify your email before logging in",
  "needsVerification": true
}

# Error Response (401 Unauthorized)
{
  "message": "Invalid credentials"
}
```

### 3. Verify Email
Verify user's email address using the token sent to their email.

```bash
GET /api/auth/verify-email/:token

# Request
curl -X GET http://localhost:3000/api/auth/verify-email/YOUR_VERIFICATION_TOKEN

# Success Response (200 OK)
{
  "message": "Email verified successfully"
}

# Error Response (400 Bad Request)
{
  "message": "Invalid or expired verification token"
}
```

### 4. Resend Verification Email
Request a new verification email.

```bash
POST /api/auth/resend-verification

# Request
curl -X POST http://localhost:3000/api/auth/resend-verification \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com"
}'

# Success Response (200 OK)
{
  "message": "Verification email sent successfully"
}

# Error Response (404 Not Found)
{
  "message": "User not found"
}
```

### 5. Google OAuth Authentication

```bash
# 1. Initiate Google OAuth
GET /api/auth/google

# Frontend should redirect user to:
http://localhost:3000/api/auth/google

# 2. Google OAuth Callback
GET /api/auth/google/callback

# After successful authentication, user will be redirected to:
${FRONTEND_URL}/auth/callback?token=YOUR_JWT_TOKEN

# After failed authentication, user will be redirected to:
${FRONTEND_URL}/auth/error
```

## Protected Routes

### 1. Get User Profile
Get the authenticated user's profile information.

```bash
GET /api/protected/profile

# Request
curl -X GET http://localhost:3000/api/protected/profile \
-H "Authorization: Bearer YOUR_JWT_TOKEN"

# Success Response (200 OK)
{
  "message": "You have access to this protected route",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "picture": null
  }
}

# Error Response (401 Unauthorized)
{
  "message": "Unauthorized"
}
```

### 2. Get Dashboard Data
Get user's dashboard information.

```bash
GET /api/protected/dashboard

# Request
curl -X GET http://localhost:3000/api/protected/dashboard \
-H "Authorization: Bearer YOUR_JWT_TOKEN"

# Success Response (200 OK)
{
  "message": "Dashboard data",
  "timestamp": "2024-02-20T12:00:00Z"
}
```

## Important Notes for Developers

### Authentication
1. JWT tokens are required for all protected routes
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. Tokens expire after 24 hours

### Error Handling
Common error responses to handle:

```javascript
// 400 Bad Request
{
  "errors": [/* validation errors */]
}

// 401 Unauthorized
{
  "message": "Unauthorized"
}

// 403 Forbidden
{
  "message": "Please verify your email before logging in"
}

// 404 Not Found
{
  "message": "Resource not found"
}

// 500 Server Error
{
  "message": "Internal server error"
}
```

### Frontend Implementation Guidelines

1. **Email Verification Flow**:
   - After registration, show message to check email
   - If login returns `needsVerification: true`, show option to resend
   - Implement verification success/error pages

2. **Google OAuth Flow**:
   - Implement `/auth/callback` route to handle the JWT token
   - Implement `/auth/error` route for OAuth failures
   - Store received JWT token securely

3. **Protected Routes**:
   - Always include JWT token in requests
   - Handle 401 responses by redirecting to login
   - Implement token refresh mechanism if needed

### Security Best Practices

1. Store JWT tokens in HttpOnly cookies
2. Implement CSRF protection
3. Use HTTPS in production
4. Sanitize all user inputs
5. Implement rate limiting for auth endpoints

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    picture VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Verification Tokens Table
```sql
CREATE TABLE verification_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
``` 