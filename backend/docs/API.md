# API Documentation

Base URL: `http://localhost:3000/api/v1`

## Authentication

### Register New User

```http
POST /api/v1/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input format |
| `USER_EXISTS` | 409 | Email already registered |
| `REGISTRATION_FAILED` | 500 | Server error |

---

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Missing email or password |
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |
| `LOGIN_FAILED` | 500 | Server error |

---

### Get Current User Profile

```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2026-03-26T00:00:00.000Z"
  }
}
```

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `TOKEN_EXPIRED` | 401 | Token has expired |
| `USER_NOT_FOUND` | 404 | User no longer exists |

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| General API | 100 req | 15 min |
| Auth endpoints | 10 req | 15 min |
| Health check | No limit | - |

---

## Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": [
      { "field": "email", "message": "Invalid format" }
    ]
  }
}
```

---

## Success Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "meta": { ... }
}
```

---

## OpenAPI/Swagger

To generate interactive API documentation, run:

```bash
npm install swagger-ui-express swagger-autogen --save-dev
```

Then add `swagger.js` to generate the spec automatically from your routes.

---

*Last updated: 2026-03-26*
