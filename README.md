# CommuteConnect

**Project URL:** https://commute-connect-one.vercel.app  
( Since the project is deployed on render free instance, it will have a cold start )

**Backend URL:** https://commuteconnect-backend.onrender.com

> For security reasons, Swagger UI is disabled in production. Set `NODE_ENV=development` to access the Swagger / OpenAPI interface locally.

CommuteConnect is a commute coordination and carpooling application built with **Angular, NestJS, and PostgreSQL**.

Users can create an account, find upcoming commute routes, offer available seats, send and manage seat requests, communicate through private conversations after a request is accepted, and review their commute history.

The **Angular frontend** provides the user interface for discovering and managing shared commutes, while the **NestJS REST API** handles authentication, commute coordination, seat requests, conversations, and account management.

PostgreSQL is hosted on **Supabase**. Authentication and session handling are implemented by the backend using **JWT-based authentication**.

The frontend and backend are maintained separately, with the backend located in `CommuteConnect-backend`.

---

## Features

- Email and password authentication with JWT sessions
- Search commutes by origin and destination
- Create, edit, and cancel commutes
- Interactive map pin for selecting commute origins
- Request, withdraw, accept, and reject seat requests
- Transactional seat allocation to prevent overbooking
- Private real-time chat between drivers and accepted passengers
- Dashboard for offered and joined commutes
- Profile management and commute history
- Responsive interface across mobile, tablet, and desktop
- API validation, rate limiting, and security protections

---

## Tech Stack

### Frontend

- Angular 21
- TypeScript
- Angular Signals
- Reactive Forms
- RxJS
- Maps SDK
- Socket.IO Client
- Playwright
- Vercel

### Backend

- Node.js 24
- NestJS 11
- TypeScript
- PostgreSQL / Supabase
- TypeORM
- Argon2
- JWT
- Socket.IO
- Swagger / OpenAPI
- Jest & Supertest
- Docker / Render

---

## Project Structure

### Frontend

```text
src/app/
  core/       Authentication, guards, interceptors, and shared models
  features/   Auth, commutes, dashboard, profile, history, and chat
  shared/     Reusable components, forms, states, cards, and pagination
  utils/      API paths and HTTP requests
  app.routes.ts
  app.component.ts
```

The frontend uses **Angular Signals** for view state. `AuthService` manages authentication state, while `ApiService` handles communication with the backend.

### Backend

```text
src/
  auth/           Registration, login, JWT authentication, and sessions
  users/          Profile and account management
  posts/          Commute creation, search, editing, and cancellation
  interests/      Seat requests, decisions, withdrawals, and history
  notifications/  Read and clear notifications
  chat/           Private messaging and Socket.IO
  common/         Configuration, validation, errors, pagination, and Swagger
  database/       Entities, migrations, and database configuration
  main.ts         Application entry point
  setup.ts        Middleware, validation, CORS, and API configuration

test/             Integration and end-to-end tests
```

The backend follows a modular **NestJS** architecture, with PostgreSQL persistence managed through **TypeORM** and real-time communication handled through **Socket.IO**.

---

## Database

Migrations create a private `commuteconnect` schema containing:

```text
users
posts
interests
sessions
messages
```

Relations use foreign keys and cascade operational data where appropriate. Cancelled commutes are retained through `deletedAt` for history.

Account deletion removes associated commutes, interests, sessions, and messages through cascading deletion where appropriate, reducing unnecessary retention of user-related operational data and maintaining privacy.

Only the user's name and email are retained as a limited legal record.

The service uses parameterized TypeORM queries and PostgreSQL transactions. TypeORM schema synchronization is disabled; migrations are used for database changes.

---

# How to Run Locally

CommuteConnect can be run locally using **Docker** or by running the frontend and backend separately.

**Important: Set up the .env at root of the project before running.**

Following are placeholders:

POSTGRES_PASSWORD=commuteconnect_dev_2026
JWT_SECRET=put-a-long-random-secret-here-at-least-32-bytes



## Option 1 — Docker

Make sure **Docker is installed and running**.

From the root directory of the project, run:

```bash
docker compose up --build
```

This starts the application and its required local services.

To stop the containers:

```bash
docker compose down
```

## Option 2 — Run Frontend and Backend Separately

The frontend and backend can also be run independently without Docker.

Follow the detailed local setup instructions in:

```text
CommuteConnect-app/README.md
CommuteConnect-backend/README.md
```

These README files contain the environment configuration, dependency installation, database setup, and startup instructions for each respective service.

When running manually, start the **NestJS backend first**, followed by the **Angular frontend**.

The application will be available at:

```text
http://localhost:4200
```

---

## Environment Variables

Create separate `.env` files for the frontend and backend.

### Frontend

For local development:

```env
API_PROXY_TARGET=
CHAT_SERVER_URL=
```

For local development, configure `API_PROXY_TARGET` for the local backend as described in the frontend README. `CHAT_SERVER_URL` can remain empty when the Angular development server proxies Socket.IO traffic.

For Vercel:

```env
CHAT_SERVER_URL=https://your-service.onrender.com
API_PROXY_TARGET=https://your-service.onrender.com
```

### Backend

For local development:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=your_local_postgresql_connection_string
DATABASE_SSL=false
DATABASE_SSL_CA_FILE=
JWT_SECRET=
FRONTEND_ORIGINS=http://localhost:4200
```

For production:

- `NODE_ENV=production`
- `DATABASE_URL` — PostgreSQL connection string from Supabase
- `DATABASE_SSL=true`
- `JWT_SECRET` — Secure secret containing at least 32 bytes
- `FRONTEND_ORIGINS` — Allowed frontend origins separated by commas
- `DATABASE_SSL_CA_FILE` — Path to the database CA certificate when required

Generate a JWT secret using:

```bash
openssl rand -hex 48
```

---

## Authentication Flow and API Overview

The API returns a short-lived JWT access token after registration or sign-in.

The frontend keeps this token in memory and sends it through the `Authorization` header:

```text
Authorization: Bearer <access_token>
```

All application endpoints use the `/api` prefix. Protected endpoints require authentication.

A rotated refresh token is stored in an **HTTP-only cookie**. On reload, the frontend calls the refresh endpoint to restore the authenticated user without exposing the refresh credential to JavaScript.

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

---

# Key Technical Decisions

- **Authentication and session security:** Authentication is handled by the NestJS backend using JWT. Short-lived access tokens are kept in frontend memory, while rotated refresh tokens are stored in HTTP-only cookies. Passwords are hashed using Argon2.

- **Map-based origin selection:** A Maps SDK is integrated into commute creation so users can pin their origin directly on a map. This provides a simpler way to specify pickup locations and creates structured geographic data for future routing features.

- **Private in-app chat:** Drivers and accepted passengers can communicate directly inside CommuteConnect without revealing their personal phone numbers or email addresses.

- **WebSockets for chat:** Socket.IO is used for real-time message delivery, while REST APIs handle stored message history. This avoids repeatedly polling the backend for new messages.

- **Angular Signals for state management:** Angular Signals and services manage frontend state instead of introducing NgRx. RxJS is used where asynchronous HTTP and event streams are appropriate. This keeps state management lightweight for the current application size.

- **Server-authoritative seat allocation:** Important commute and seat-request state is controlled by the backend. PostgreSQL transactions are used for operations such as seat allocation to help prevent overbooking during concurrent requests.

- **Cascade deletion for privacy:** Account deletion removes related operational data such as commutes, interests, sessions, and messages through database relationships and cascading deletion where appropriate.

- **Centralized API communication:** Backend communication is kept out of individual UI components through shared API services and consistent `/api` routes.

---

# Technical Trade-offs

- **Email verification:** Not implemented to prioritize the core commute, authentication, mapping, and chat workflows.
- **Chat encryption:** Chat is access-controlled but does not currently provide end-to-end encryption.
- **Route optimization:** The map supports location selection, but traffic-aware, eco-friendly, and custom routing are outside the current scope.
- **State management:** Angular Signals were preferred over NgRx to avoid unnecessary complexity for the current application size.
- **Real-time scaling:** Socket.IO currently operates without Redis-based coordination, which would be needed for larger horizontally scaled deployments.

---

# What I Would Do Differently with More Time and Resources

- Add **email verification**, password reset, MFA, and better session management.
- Implement **end-to-end encryption** for private chat.
- Add intelligent **origin-to-destination route planning**.
- Provide **fastest, low-traffic, eco-friendly, and custom route options**.
- Improve carpool matching based on route overlap, pickup distance, detour, and departure time.
- Expand chat with read status, delivery acknowledgements, typing indicators, and better notifications.
- Add Redis-backed Socket.IO coordination for horizontal backend scaling.
- Expand integration, concurrency, accessibility, and failure-handling tests.
- Further refine the UI using **Apple-inspired design principles**, focusing on simplicity, hierarchy, spacing, typography, purposeful animations, accessibility, and polished interactions.

---

## Deployment

### Frontend — Vercel

The application is prepared for Vercel deployment.

1. Import the repository into Vercel.
2. Set the root directory to `CommuteConnect-app`.
3. Use `npm run build` as the build command.
4. Use `dist/commuteconnect/browser` as the output directory.
5. Replace the placeholder Render URL in `vercel.json` with the deployed backend URL.
6. Set `CHAT_SERVER_URL` to that same backend origin.
7. Add the exact Vercel domain to the backend `FRONTEND_ORIGINS` setting.

The `/api` rewrite must remain before the Angular single-page application fallback.

### Backend — Render

Follow the production environment-variable setup before deployment.

The backend is prepared for Render through the repository-level `render.yaml`.

1. Create a Render Docker web service with `CommuteConnect-backend` as its root directory.
2. Configure `DATABASE_URL`, `DATABASE_SSL=true`, `JWT_SECRET`, and `FRONTEND_ORIGINS`.
3. Keep `NODE_ENV=production`.
4. Run the following as the pre-deploy command:

```bash
node dist/database/migrate.js
```

5. Use `/api/health` as the health-check path.

The application trusts exactly one proxy hop and requires HTTPS frontend origins in production.