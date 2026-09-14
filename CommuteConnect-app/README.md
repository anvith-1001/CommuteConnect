# CommuteConnect Frontend

An Angular frontend for finding and offering shared commutes. Users can create an account, search upcoming routes, offer seats, manage commute requests, chat privately after acceptance, view commute origins on a map, receive notifications, and review their commute history.

The backend API and PostgreSQL database are maintained separately in `CommuteConnect-backend`.

## Features

- Email and password registration and sign-in
- Session restoration with short-lived JWT access tokens
- Search by origin and destination with typo-tolerant backend matching
- Paginated commute results
- Commute creation, editing, cancellation, and detail views
- Interest requests, withdrawals, acceptance, and rejection
- Private one-to-one chat between a driver and each accepted passenger
- Real-time unread-message notifications for private conversations
- Google Maps origin-point selection and viewing
- OpenStreetMap fallback when Google Maps is unavailable
- In-app and browser notifications for commute requests, decisions, messages, and ride updates
- Unread notification counts, direct notification navigation, and confirmed notification clearing
- Dashboard for upcoming offered and joined commutes
- Profile editing, commute history, and password-confirmed account deletion
- Loading, empty, validation, and API error states
- Responsive layouts for mobile, tablet, and desktop

## Tech Stack

- Angular 21
- TypeScript
- Angular Signals and services
- Reactive Forms
- RxJS
- Socket.IO Client
- Google Maps JavaScript API
- OpenStreetMap and Leaflet
- Flatpickr
- Playwright
- Vercel

## Project Structure

```text
src/app/
  core/       Authentication state, route guards, HTTP interceptor, and shared models
  features/   Auth, commute posts, dashboard, profile, history, and chat pages
  shared/     Reusable fields, selectors, date picker, map picker, states, cards, and pagination
  utils/      Centralized API paths and HTTP requests
  app.routes.ts
  app.component.ts
```

Pages keep view-specific state in Angular Signals. `AuthService` owns authentication state, while `ApiService` in `src/app/utils/api.ts` owns backend requests and endpoint paths. Shared form, map, and state components keep validation, loading, empty, and error behavior consistent.

## Environment Variables

Create a local `.env` file in this directory:

```text
CHAT_SERVER_URL=
GOOGLE_MAPS_API_KEY=
```

For local development, leave `CHAT_SERVER_URL` empty. The Angular development server proxies `/api` and Socket.IO requests to the local backend.

`GOOGLE_MAPS_API_KEY` is public browser configuration for selecting and viewing commute origin points. Restrict it in Google Cloud to the Maps JavaScript API and your localhost and production HTTP referrers.

If Google Maps is unavailable or the API key is not configured, the application falls back to OpenStreetMap.

For Vercel, set `CHAT_SERVER_URL` to the public HTTPS origin of the Render backend:

```text
CHAT_SERVER_URL=https://your-service.onrender.com
```

These values are public browser configuration. Never add database credentials, JWT secrets, or Supabase credentials to the frontend environment.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the NestJS backend first, then run the Angular development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:4200
```

Local `/api` and Socket.IO traffic is proxied to:

```text
http://localhost:3000
```

## Available Commands

```bash
npm start          # Start the local Angular development server
npm run build      # Create a production build
npm run check      # Compile templates and code in development mode
npm run typecheck  # Type-check the application and browser tests
npm run test:e2e   # Run the isolated Playwright user journey
```

Before running the browser test, install Chromium once:

```bash
npx playwright install chromium
```

The E2E runner starts an isolated backend, temporary PostgreSQL database, and frontend test server. It does not use the configured Supabase database.

## Authentication Flow

The API returns a short-lived JWT access token after registration or sign-in. The frontend keeps this token in memory and sends it through the `Authorization` header:

```text
Authorization: Bearer <access_token>
```

A rotated refresh token is stored in an HTTP-only cookie. On reload, the frontend calls the refresh endpoint to restore the authenticated user without exposing the refresh credential to JavaScript.

## Chat and Notifications

Accepted passengers and commute posters can communicate through private one-to-one conversations. Socket.IO delivers new messages in real time, while unread-message counts are shown in the notification menu.

The application creates notifications for new interest requests, accepted or rejected interests, new messages, and ride status changes. Selecting a notification opens the related commute or conversation. Browser notifications are available after the user grants permission.

## Maps

Commute posters can select an origin point when creating a commute. Interested passengers can view the selected origin before sending an interest request.

Google Maps is used when a valid browser API key is available. OpenStreetMap provides the fallback map when Google Maps cannot load.

## Deployment

The application is prepared for Vercel deployment.

1. Import the repository into Vercel.
2. Set the root directory to `CommuteConnect-app`.
3. Use `npm run build` as the build command.
4. Use `dist/commuteconnect/browser` as the output directory.
5. Replace the placeholder Render URL in `vercel.json` with the deployed backend URL.
6. Set `CHAT_SERVER_URL` to that same backend origin.
7. Set `GOOGLE_MAPS_API_KEY` and restrict it to the production Vercel domain.
8. Add the exact Vercel domain to the backend `FRONTEND_ORIGINS` setting.

The `/api` rewrite must remain before the Angular single-page application fallback.