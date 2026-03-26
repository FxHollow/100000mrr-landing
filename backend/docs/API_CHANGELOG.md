# API Changelog

All notable changes to the 100000MRR API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-03-27

### Added

#### System Endpoints
- `GET /health` - Health check endpoint with status, timestamp, version info
- `GET /api/v1` - API info endpoint listing all available endpoints

#### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user with email, password, name
- `POST /api/v1/auth/login` - Login with email and password, returns JWT tokens
- `GET /api/v1/auth/me` - Get current user profile (requires auth)
- `POST /api/v1/auth/refresh` - Refresh access token using refresh token
- `POST /api/v1/auth/logout` - Logout user and invalidate refresh token

#### User Management Endpoints (Admin Only)
- `GET /api/v1/users` - List users with pagination, search, and role filtering
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user (name, role, etc.)
- `DELETE /api/v1/users/:id` - Delete user (SUPER_ADMIN only)

#### Course Management Endpoints
- `GET /api/v1/courses` - List all published courses (public)
- `GET /api/v1/courses/:slug` - Get course details by slug (public)
- `GET /api/v1/courses/my` - Get enrolled courses for current user (auth required)
- `POST /api/v1/courses/:id/enroll` - Enroll in a course (auth required)
- `POST /api/v1/courses` - Create new course (ADMIN+ only)
- `PATCH /api/v1/courses/:id` - Update course (ADMIN+ only)

#### Documentation
- Interactive Swagger UI at `/docs`
- Postman collection export (`postman-collection.json`)
- OpenAPI 3.0 specification (`swagger-output.json`)

### Security
- JWT authentication with access tokens (7-day expiry)
- Refresh tokens (30-day expiry) for token renewal
- Role-based access control (RBAC): USER, ADMIN, SUPER_ADMIN
- Rate limiting: 100 req/15min general, 10 req/15min auth endpoints
- Helmet.js security headers
- CORS configuration

### Database
- PostgreSQL 15 with Prisma ORM
- Full B2C platform schema: User, Course, Chapter, Lesson, Enrollment, CourseProgress, Order, Article
- Migration system ready

---

## [0.0.1] - 2026-03-26

### Added
- Initial project setup
- Node.js 20 LTS + Express.js
- Prisma ORM with PostgreSQL
- Docker Compose for local development

---

## Future Changes (Planned)

### Phase 2 (Week 3-4)
- [ ] Database seeding scripts
- [ ] Payment integration (WeChat Pay, Alipay)
- [ ] Unit and integration tests

### Phase 3 (Month 2)
- [ ] Redis caching layer
- [ ] Background job queue (Bull)
- [ ] File upload handling (S3/OSS)
- [ ] WebSocket for real-time features

### Phase 4 (Month 3+)
- [ ] API versioning (v2)
- [ ] GraphQL endpoint (under consideration)
- [ ] Rate limiting per user tier
