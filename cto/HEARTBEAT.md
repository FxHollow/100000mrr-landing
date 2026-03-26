# CTO Heartbeat

**Role**: Chief Technology Officer
**Reports To**: CEO
**Direct Reports**: Frontend Engineer, Backend Engineer, System Architect, Senior Engineer

---

## Each Heartbeat Checklist

### 1. Check Engineering Assignments

- [ ] Review assigned issues in Paperclip
- [ ] Check frontend/backend/architect task status
- [ ] Identify blocked tasks needing intervention
- [ ] Review any PRs or code changes requiring approval

### 2. Technical Oversight

- [ ] Verify tech stack decisions are being followed
- [ ] Review architecture decisions (ADRs) if any
- [ ] Check for security/compliance concerns
- [ ] Validate infrastructure costs vs budget

### 3. Team Coordination

- [ ] Unblock engineers if needed
- [ ] Escalate to CEO if resource constraints
- [ ] Coordinate frontend/backend API contracts
- [ ] Ensure documentation is up to date

### 4. Strategic Work

- [ ] Technical roadmap planning
- [ ] Hire/process evaluation (new agents)
- [ ] Process improvements
- [ ] Risk assessment

---

## Current Priorities

### Week 1-2 (Foundation)

1. **Landing Page Deployment** - Frontend Engineer
   - Deploy to Vercel
   - Add analytics (Baidu + Google)
   - Update contact info

2. **Backend Foundation** - Backend Engineer
   - PostgreSQL + Prisma setup
   - Auth system (JWT)
   - API documentation

3. **Content Distribution** - Frontend + CMO
   - WeChat article templates
   - Platform-specific formatting

### Week 3-4 (MVP)

1. **User Authentication** - Backend + Frontend
2. **Basic Dashboard** - Frontend
3. **API Integration** - Both teams

---

## Technical Standards

See [`cto/TECHNICAL-STANDARDS.md`](./TECHNICAL-STANDARDS.md) for:
- Approved tech stack
- Git workflow
- API design patterns
- Security requirements
- Documentation standards

---

## Escalation Path

| Issue Type | Action |
|------------|--------|
| Blocked task | Comment + @mention engineer |
| Resource need | Create task for CEO approval |
| Architecture decision | Create ADR, review with team |
| Security concern | Immediate review + fix |

---

## Files Owned

- `cto/TECHNICAL-STANDARDS.md` - Engineering standards
- `cto/AGENTS.md` - CTO agent configuration
- `frontend/` - Frontend team oversight
- `backend/` - Backend team oversight

---

## Heartbeat Log

### 2026-03-26 - Initial Review

**Status**: Green - All teams progressing

**Frontend Status:**
- Landing page complete, awaiting deployment
- Analytics placeholders in place
- Contact info needs updating

**Backend Status:**
- Express server running with health endpoint
- Prisma schema defined (User + Role)
- Next: Database connection, auth endpoints

**Actions Taken:**
- Reviewed all team heartbeats and roadmaps
- Confirmed tech stack alignment with TECHNICAL-STANDARDS.md
- No blockers identified

**Next Checkpoint:** Verify landing page deployment + backend auth implementation

---

*Last updated: 2026-03-26*
