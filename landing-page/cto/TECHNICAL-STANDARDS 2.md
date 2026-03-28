# Technical Standards & Governance

**Owner**: CTO
**Last Updated**: 2026-03-26
**Applies To**: All Engineering Teams (Frontend, Backend, Architecture)

---

## 1. Tech Stack Decisions

### Frontend Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework (Phase 2)** | React 18 + Vite | Ecosystem, hiring pool, performance |
| **Styling** | Tailwind CSS | Rapid development, consistency |
| **State Management** | Zustand | Lightweight, React-friendly |
| **Forms** | React Hook Form + Zod | Type-safe validation |
| **HTTP Client** | TanStack Query (React Query) | Caching, background sync |
| **Charts** | Recharts | React-native, customizable |
| **Deployment** | Vercel | CDN, China-adjacent performance |

### Backend Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Runtime** | Node.js 20 LTS | JavaScript full-stack, performance |
| **Framework** | Express.js | Stability, middleware ecosystem |
| **Database** | PostgreSQL 15+ | Reliability, JSON support |
| **ORM** | Prisma | Type safety, migrations |
| **Validation** | Zod | Shared types with frontend |
| **Auth** | JWT + bcrypt | Standard, secure |
| **Logging** | Winston | Structured, transportable |
| **Cache** | Redis 7+ | Session store, rate limiting |

### Infrastructure

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Container** | Docker + Compose | Dev/prod parity |
| **CI/CD** | GitHub Actions | Integrated with repo |
| **Cloud** | Aliyun ECS (primary) | China latency, compliance |
| **Monitoring** | Prometheus + Grafana | Self-hosted, customizable |
| **Logs** | Winston + file/ELK | Structured, searchable |

---

## 2. Development Workflow

### Git Flow

```
main (protected) ← staging ← feature/*
                        ← hotfix/*
                        ← release/*
```

**Rules:**
1. All changes via Pull Request
2. Minimum 1 reviewer (2 for critical paths)
3. All CI checks must pass
4. Squash merge for feature branches
5. Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`)

### Code Review Checklist

**Required for all PRs:**

- [ ] Code follows style guide (eslint/prettier)
- [ ] Tests added/updated (if applicable)
- [ ] No console.log in production code
- [ ] Error handling in place
- [ ] Input validation on external data
- [ ] No hardcoded secrets
- [ ] Documentation updated (if API/contract changed)

### Branch Protection (main)

- Require PR review
- Require status checks passing
- No force pushes
- No direct commits

---

## 3. API Design Standards

### URL Conventions

```
GET    /api/v1/resources          # List
POST   /api/v1/resources          # Create
GET    /api/v1/resources/:id      # Get one
PATCH  /api/v1/resources/:id      # Update
DELETE /api/v1/resources/:id      # Delete
```

### Response Format

**Success (2xx):**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-03-26T10:00:00Z",
    "requestId": "req_abc123"
  }
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [...]  // optional
  }
}
```

### Pagination (Cursor-based)

```
GET /api/v1/resources?limit=20&cursor=eyJpZCI6MTAwfQ==
```

Response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTIwfQ==",
    "hasMore": true
  }
}
```

### Rate Limiting

| Endpoint | Limit |
|----------|-------|
| Public (unauth) | 60 req/min |
| Authenticated | 300 req/min |
| File upload | 10 req/min |

---

## 4. Security Standards

### Authentication

- JWT tokens with 15min expiry
- Refresh tokens with 7-day expiry (rotating)
- Password requirements: min 8 chars, 1 upper, 1 number, 1 special
- bcrypt cost factor: 12

### Headers (via Helmet)

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000

### Input Validation

- All external input validated with Zod schemas
- SQL injection: prevented via Prisma (parameterized)
- XSS: sanitized on output (frontend)

### Dependencies

- Weekly `npm audit` review
- Critical vulnerabilities: patch within 24h
- Major version updates: review changelog first

---

## 5. Observability

### Logging Levels

| Level | Use Case |
|-------|----------|
| ERROR | Request failures, exceptions |
| WARN | Retries, degraded state |
| INFO | Request received, business events |
| DEBUG | Detailed flow (dev only) |

### Log Format (JSON)

```json
{
  "level": "info",
  "timestamp": "2026-03-26T10:00:00Z",
  "requestId": "req_abc123",
  "method": "GET",
  "path": "/api/v1/users",
  "statusCode": 200,
  "durationMs": 45,
  "ip": "192.168.1.1"
}
```

### Metrics to Track

- Request latency (p50, p95, p99)
- Error rate (4xx, 5xx)
- Database query duration
- Cache hit rate

---

## 6. Documentation Standards

### Code Documentation

- JSDoc/TSDoc for public functions
- README in each module folder
- Inline comments for non-obvious logic only

### API Documentation

- OpenAPI 3.0 spec maintained
- Swagger UI at `/docs` (dev/staging only)
- Postman collection synced monthly

### Architecture Documentation

- ADR (Architecture Decision Records) for major decisions
- C4 diagrams for system overview
- Data flow diagrams for complex features

---

## 7. Incident Response

### Severity Levels

| Severity | Response Time | Example |
|----------|---------------|---------|
| P0 - Critical | 15 min | Service down, data breach |
| P1 - High | 1 hour | Feature broken, data loss risk |
| P2 - Medium | 4 hours | Degraded performance |
| P3 - Low | 1 week | Minor bugs, cosmetic issues |

### Post-Incident Review

Required for P0/P1 incidents within 48 hours:
1. Timeline of events
2. Root cause analysis
3. Action items with owners
4. Prevention measures

---

## 8. Environment Configuration

### Required Variables

**All Services:**
```
NODE_ENV=development|staging|production
LOG_LEVEL=debug|info|warn|error
```

**Backend:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
REDIS_URL=redis://...
```

**Frontend:**
```
VITE_API_URL=https://api.example.com
VITE_ENV=development|production
```

### Secrets Management

- Never commit secrets to git
- Use `.env` files locally (gitignored)
- Production: use cloud secret manager
- Rotate secrets quarterly

---

## Compliance

All engineers must follow these standards. Exceptions require CTO approval via Architecture Decision Record (ADR).

**Review Cycle**: Quarterly or when stack changes

---

*CTO Office - 100000MRR*
