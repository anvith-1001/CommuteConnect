# CommuteConnect Backend

A NestJS REST API for commute coordination, JWT-based authentication, seat requests, private passenger conversations, and account management. PostgreSQL is hosted on Supabase, but authentication and session handling are implemented by this service rather than Supabase Auth.

## Features

- Email and password registration with Argon2 password hashing
- Short-lived JWT access tokens
- Rotating, hashed refresh sessions stored in PostgreSQL
- Profile retrieval and editing
- Password-confirmed account deletion with limited legal-record retention
- Commute creation, listing, detail, editing, and cancellation
- Paginated origin and destination search with PostgreSQL trigram matching
- Interest creation, withdrawal, acceptance, and rejection
- Transactional seat allocation that prevents overbooking
- Private one-to-one chat for each accepted passenger
- Socket.IO real-time message delivery with participant authorization
- DTO validation and structured HTTP error responses
- Versioned TypeORM migrations
- Development-only Swagger/OpenAPI documentation
- Rate limiting, CORS restrictions, security headers, and verified database TLS
- Docker and Render deployment support

## Tech Stack

- Node.js 24
- NestJS 11
- TypeScript
- PostgreSQL / Supabase
- TypeORM
- Argon2
- JSON Web Tokens
- Socket.IO
- Swagger / OpenAPI
- Jest and Supertest
- Docker

## Project Structure

```text
src/
  auth/       Registration, login, refresh sessions, JWT guard, and auth DTOs
  users/      Profile management and account deletion
  posts/      Commute lifecycle, ownership, availability, and search
  interests/ Seat requests, decisions, withdrawal, and history
  chat/       Authorized REST messages and Socket.IO gateway
  common/     Configuration, errors, pagination, validation, and Swagger
  database/   Entities, data source, migrations, and migration runner
  main.ts     Application entry point
  setup.ts    Global middleware, validation, CORS, and API configuration
test/         Isolated PostgreSQL integration and browser test runners
```


## Environment Variables

Create a `.env` file in this directory and configure:

```text
NODE_ENV=development
PORT=3000
DATABASE_URL=
DATABASE_SSL=true
DATABASE_SSL_CA_FILE=
JWT_SECRET=
FRONTEND_ORIGINS=http://localhost:4200
```

`DATABASE_URL` must be a PostgreSQL connection string from the Supabase Connect panel. `JWT_SECRET` must contain at least 32 bytes. Use comma-separated exact origins in `FRONTEND_ORIGINS` when more than one frontend is allowed.

When Supabase requires its CA certificate, save the certificate locally and set `DATABASE_SSL_CA_FILE` to its path. Relative paths are resolved from this backend directory.

Do not commit `.env`, database credentials, JWT secrets, or production certificates.

## Local Setup

Install dependencies:

```bash
npm install
```

Apply database migrations:

```bash
npm run migration:run
```

Start the development server:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000/api
```

Swagger documentation is available in development at:

```text
http://localhost:3000/docs
```

The OpenAPI JSON document is available at:

```text
http://localhost:3000/docs-json
```

Both documentation routes return `404` when `NODE_ENV=production`.

## Available Commands

```bash
npm run start:dev           # Start NestJS with file watching
npm run build               # Compile the production application
npm start                   # Run the compiled application
npm run migration:run       # Apply migrations from TypeScript sources
npm run migration:run:prod  # Apply compiled migrations
npm test                    # Run unit tests
npm run test:integration    # Run isolated API integration tests
npm run typecheck           # Type-check source and tests
npm run format              # Format backend source and tests
npm run format:check        # Check formatting without modifying files
```

Integration tests create and destroy their own temporary PostgreSQL cluster. They do not read or modify the configured Supabase database.

## API Overview

All application endpoints use the `/api` prefix. Protected endpoints require:

```text
Authorization: Bearer <access_token>
```

Main route groups:

```text
/api/auth        Registration, login, session refresh, and logout
/api/users       Profile management and account deletion
/api/posts       Commute discovery and owner-managed posts
/api/interests   Interest history, decisions, withdrawal, and chat
/api/health      Database-backed readiness check
```

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
```

### Users

```text
GET    /api/users/me
PATCH  /api/users/me
DELETE /api/users/me
```

### Commutes

```text
GET    /api/posts
GET    /api/posts/mine
GET    /api/posts/{id}
POST   /api/posts
PUT    /api/posts/{id}
DELETE /api/posts/{id}
```

### Interests and Chat

```text
POST   /api/posts/{id}/interests
GET    /api/posts/{id}/interests
GET    /api/interests/mine
PATCH  /api/interests/{id}/decision
PATCH  /api/interests/{id}/withdraw
GET    /api/interests/{interestId}/messages
POST   /api/interests/{interestId}/messages
```

Real-time chat uses the Socket.IO namespace `/chat`. The access JWT is supplied in the socket authentication payload. Every join and message operation checks that the interest is accepted and that the caller is either the commute owner or that specific passenger.

## Database

Migrations create a private `commuteconnect` schema containing:

```text
users
posts
interests
sessions
messages
```

Relations use foreign keys and cascade operational data where appropriate. Cancelled commutes are retained through `deletedAt` for history. Account deletion removes commutes, interests, sessions, and messages while retaining only the user's name and email as a limited legal record.

The service uses parameterized TypeORM queries and PostgreSQL transactions. TypeORM schema synchronization is disabled; use migrations for every database change.

## Docker

### Complete Local Environment

The repository-level Compose file runs local PostgreSQL, applies migrations, starts this API, and serves the Angular frontend. From the repository root:

```bash
cp -n .env.example .env
openssl rand -hex 48
```

Paste the generated value into the root `.env` as `JWT_SECRET`, then run:

```bash
docker compose up --build
```

The services start in dependency order:

```text
database -> migrate -> backend -> frontend
```

Local services are available at:

```text
Frontend: http://localhost:8080
API:      http://localhost:3000/api
Swagger:  http://localhost:3000/docs
Database: localhost:5432
```

The local database is stored in the `commute_data` Docker volume. Stop the environment without deleting its data:

```bash
docker compose down
```

To intentionally delete the local database and begin again:

```bash
docker compose down --volumes
```

### Backend Image

Build the backend image:

```bash
docker build -t commuteconnect-api .
```

Run it with the required environment variables:

```bash
docker run --env-file .env -p 3000:3000 commuteconnect-api
```

The production image runs as the unprivileged Node user and starts the compiled application.

## Deployment

The backend is prepared for Render through the repository-level `render.yaml`.

1. Create a Render Docker web service with `CommuteConnect-backend` as its root directory.
2. Configure `DATABASE_URL`, `DATABASE_SSL=true`, `JWT_SECRET`, and `FRONTEND_ORIGINS`.
3. Keep `NODE_ENV=production`.
4. Run `node dist/database/migrate.js` as the pre-deploy command.
5. Use `/api/health` as the health-check path.

Render terminates TLS at its proxy. The application trusts exactly one proxy hop and requires HTTPS frontend origins in production.