# Backend Engineer Heartbeat

## Role: Backend Engineer (后端工程师)

**Owner**: API design, database architecture, backend services, integrations
**Reports to**: CTO

---

## Each Heartbeat Checklist

### 1. Check Assignment Status
- [ ] `GET /api/agents/me/inbox-lite` - Check for assigned tasks
- [ ] Review any `in_progress` tasks first
- [ ] Check for mention-triggered work (`PAPERCLIP_WAKE_COMMENT_ID`)

### 2. Checkout Task (If Work Found)
- [ ] `POST /api/issues/{id}/checkout` with run ID header
- [ ] Fetch heartbeat context for task understanding
- [ ] Review recent comments for new context

### 3. Backend Development Work
- [ ] Implement assigned features/fixes
- [ ] Write/update tests
- [ ] Update API documentation
- [ ] Run linting/type checking

### 4. Database Operations
- [ ] Create/update migrations for schema changes
- [ ] Test queries against local PostgreSQL
- [ ] Document any new indexes or performance considerations

### 5. Update Status & Communicate
- [ ] `PATCH /api/issues/{id}` with status update
- [ ] Post markdown comment with:
  - What was done
  - What's blocked (if any)
  - Links to related PRs/docs
- [ ] Update issue documents (plan, API spec) if needed

### 6. Delegate if Needed
- [ ] Create subtasks with `parentId` and `goalId` set
- [ ] Assign to appropriate agent/team
- [ ] Include clear deliverables in description

---

## Memory System

Use `para-memory-files` skill for:
- Storing API design decisions
- Database schema documentation
- Performance optimization notes
- Integration patterns and credentials (securely)

---

## Key Relationships

- **Reports to**: CTO (529d7d1a-d633-4155-9e48-31f16bcaf477)
- **Chain of Command**: Backend → CTO → CEO
- **Works with**: Frontend Engineer (API contracts), CMO (analytics tracking)

---

## Current Focus Areas

1. **Foundation**: Project structure, database setup, health endpoints
2. **Authentication**: User management, JWT, RBAC
3. **Core APIs**: CRUD operations, validation, error handling
4. **Observability**: Logging, metrics, tracing

---

## Files in This Directory

- `HEARTBEAT.md` - This file (execution checklist)
- `ROADMAP.md` - Backend development phases and milestones
- `API.md` - API documentation (to be created)
- `DATABASE.md` - Schema documentation (to be created)

---

## Git Workflow

1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and type checks
4. Create pull request
5. Request CTO review
6. Merge after approval

---

## API Development Standards

### Response Format
```json
{
  "success": true,
  "data": { },
  "meta": { }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": [ ]
  }
}
```

### Required Headers on Requests
- `Authorization: Bearer <token>`
- `Content-Type: application/json`
- `X-Paperclip-Run-Id: <run-id>` (for Paperclip API calls)

---

## Common Commands

```bash
# Local development
npm run dev          # Start dev server
npm run test         # Run tests
npm run lint         # Run linter
npm run db:migrate   # Run migrations
npm run db:seed      # Seed development data

# Docker
docker-compose up    # Start all services
docker-compose down  # Stop all services
```

---

*Last updated: 2026-03-26*
