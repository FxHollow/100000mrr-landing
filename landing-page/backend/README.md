# Backend API

Node.js/Express backend for the 100000MRR SaaS platform.

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Docker (optional, for containerized development)

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Start PostgreSQL (Docker):**
   ```bash
   docker run -d \
     --name 10000mrr-db \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=10000mrr \
     -p 5432:5432 \
     postgres:15
   ```

4. **Run migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Verify health:**
   ```bash
   curl http://localhost:3000/health
   ```

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Entry point
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── utils/            # Utilities (logger, helpers)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.js           # Seed data
├── tests/                # Test files
├── logs/                 # Application logs
├── package.json
├── .env.example
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1` | API info |

## Tech Stack

- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js
- **Database:** PostgreSQL 15+
- **ORM:** Prisma
- **Validation:** Zod
- **Auth:** JWT
- **Logging:** Winston

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run start` | Start production server |
| `npm run test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Prisma Studio |

## Next Steps

See [ROADMAP.md](./ROADMAP.md) for development phases and milestones.
