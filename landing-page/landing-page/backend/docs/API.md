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

### Refresh Access Token

```http
POST /api/v1/auth/refresh
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc..."
  }
}
```

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Missing refresh token |
| `REFRESH_TOKEN_EXPIRED` | 401 | Refresh token expired |
| `INVALID_REFRESH_TOKEN` | 401 | Invalid refresh token |

---

### Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Logout successful"
  }
}
```

---

## User Management (Admin Only)

All user management endpoints require authentication and admin roles.

### List Users

```http
GET /api/v1/users?page=1&limit=10&search=john&role=USER
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 10 | Items per page |
| search | string | - | Search email/name |
| role | string | - | Filter by role |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2026-03-26T00:00:00.000Z",
      "updatedAt": "2026-03-26T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

### Get User by ID

```http
GET /api/v1/users/:id
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
    "createdAt": "2026-03-26T00:00:00.000Z",
    "updatedAt": "2026-03-26T00:00:00.000Z"
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

### Update User

```http
PATCH /api/v1/users/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "ADMIN"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "Updated Name",
    "role": "ADMIN",
    "createdAt": "2026-03-26T00:00:00.000Z",
    "updatedAt": "2026-03-26T00:00:00.000Z"
  }
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

### Delete User

```http
DELETE /api/v1/users/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully."
  }
}
```

**Required Role:** SUPER_ADMIN only

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `INVALID_OPERATION` | 400 | Cannot delete own account |
| `USER_NOT_FOUND` | 404 | User not found |
| `FORBIDDEN` | 403 | Insufficient permissions |

---

## Course Management (B2C Platform)

### Public Endpoints

#### List All Courses

```http
GET /api/v1/courses?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "title": "AI 技能提升计划",
      "slug": "ai-skills-bootcamp",
      "description": "30 天掌握 AI 工具",
      "price": "299.00",
      "originalPrice": "599.00",
      "status": "PUBLISHED",
      "chapters": [
        {
          "id": "chapter-uuid",
          "title": "第一章：AI 工具入门",
          "order": 1,
          "lessons": [
            {
              "id": "lesson-uuid",
              "title": "1.1 主流 AI 工具对比",
              "duration": 600,
              "isFree": true,
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

#### Get Course Details

```http
GET /api/v1/courses/:slug
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "AI 技能提升计划",
    "slug": "ai-skills-bootcamp",
    "description": "30 天掌握 AI 工具，让工作效率翻倍",
    "price": "299.00",
    "originalPrice": "599.00",
    "thumbnail": "https://...",
    "status": "PUBLISHED",
    "chapters": [...]
  }
}
```

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `COURSE_NOT_FOUND` | 404 | Course not found |

---

### Authenticated Endpoints

#### Get My Enrolled Courses

```http
GET /api/v1/courses/my
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "enrollment-uuid",
      "userId": "user-uuid",
      "courseId": "course-uuid",
      "status": "ACTIVE",
      "createdAt": "2026-03-26T00:00:00.000Z",
      "course": {
        "id": "course-uuid",
        "title": "AI 技能提升计划",
        "slug": "ai-skills-bootcamp",
        "progress": {
          "progressPercent": 45,
          "completedAt": null
        }
      }
    }
  ]
}
```

---

#### Enroll in Course

```http
POST /api/v1/courses/:id/enroll
Authorization: Bearer <token>
Content-Type: application/json
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "enrollment-uuid",
    "userId": "user-uuid",
    "courseId": "course-uuid",
    "status": "ACTIVE",
    "course": {
      "id": "course-uuid",
      "title": "AI 技能提升计划",
      "slug": "ai-skills-bootcamp"
    }
  }
}
```

**Error Responses:**

| Code | Status | Description |
|------|--------|-------------|
| `COURSE_NOT_FOUND` | 404 | Course not found |
| `COURSE_NOT_AVAILABLE` | 400 | Course not published |
| `ALREADY_ENROLLED` | 400 | Already enrolled |

---

### Admin Endpoints

#### Create Course

```http
POST /api/v1/courses
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "AI 技能提升计划",
  "slug": "ai-skills-bootcamp",
  "description": "30 天掌握 AI 工具",
  "price": 299,
  "originalPrice": 599,
  "thumbnail": "https://..."
}
```

**Required Role:** ADMIN, SUPER_ADMIN

---

#### Update Course

```http
PATCH /api/v1/courses/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "price": 199,
  "status": "PUBLISHED"
}
```

**Required Role:** ADMIN, SUPER_ADMIN

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
