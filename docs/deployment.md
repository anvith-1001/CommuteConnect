# Deploy with Supabase, Render and Vercel

Check the .env set up for both frontend and backend in their respective readme file.

## Supabase: PostgreSQL only

Create a dedicated Supabase project for CommuteConnect.  Retrieve its PostgreSQL connection string from the Connect panel. A direct connection or session pooler supports TypeORM and migration sessions; use the session pooler if IPv6/direct connectivity is unavailable. URL-encode the password. Do not put a Supabase service key or database URL in Angular.

`DATABASE_URL` is a PostgreSQL connection string, not the Supabase HTTPS project URL. `DATABASE_SSL=true` enables certificate verification; do not solve connection errors by disabling verification. If your connection needs the project's CA, download the server root certificate from Supabase Database Settings, upload it to Render as a Secret File, and set `DATABASE_SSL_CA_FILE=/etc/secrets/prod-supabase.cer` (using your actual mounted path). Avoid SSL query parameters that override the driver's verified TLS settings.

The migration creates a private `commuteconnect` schema and tables. The browser never accesses these through Supabase's Data API. For production role separation, run migrations with a schema-owning migration role, then grant the runtime role `USAGE` on the schema and `SELECT, INSERT, UPDATE, DELETE` on its tables. Do not grant `CREATE`, schema ownership, or access to other applications. Configure Render's migration step to use the migration connection when adopting separate roles.

## Render: NestJS API

1. Connect the repository and create the service using the root `render.yaml`, or create a Docker web service manually with root directory `CommuteConnect-backend`.
2. Configure `DATABASE_URL`, `DATABASE_SSL=true`, a random `JWT_SECRET` of at least 32 bytes, `NODE_ENV=production`, and `FRONTEND_ORIGINS` containing the exact HTTPS Vercel/custom domain (comma-separated if more than one). No trailing slashes or wildcard origins.
3. Set pre-deploy command to `node dist/database/migrate.js` and health check path to `/api/health`. The Docker image starts `node dist/main.js` and listens on Render's `PORT`.
4. Render's pre-deploy command availability depends on service type/plan. If unavailable, run migrations as an explicit one-off deployment step before starting the service. Never enable TypeORM synchronization as a workaround.
5. Verify `/api/health` after migrations. Keep the backend deployment URL for the frontend rewrite.

The blueprint does not create Supabase or apply migrations by itself until you deploy it. A single API instance is the intended interview configuration. Before scaling replicas, replace the in-memory rate limiter with shared storage and ensure rate-limit IP handling matches your proxy chain. Render's immediate proxy is trusted as one hop; do not increase trust blindly for client-supplied forwarding headers.

## Vercel: Angular frontend

1. Import the repository and select root directory `CommuteConnect-app`, Node 24, build command `npm run build`, output directory `dist/commuteconnect/browser`.
2. Replace `https://replace-with-your-service.onrender.com` in `vercel.json` with the actual Render API URL before deploying. Add `CHAT_SERVER_URL` in Vercel with the same Render HTTPS origin so Socket.IO connects directly to the long-running backend.
3. Keep the `/api/:path*` rewrite ahead of the SPA fallback. API requests must reach Render, including `/api/auth/*`; they must never fall back to `index.html`.
4. Add the exact Vercel frontend domain to Render's `FRONTEND_ORIGINS`. Preview deployments need explicitly allowed domains if you want authenticated previews.
5. Test sign-up, reload/session restoration, sign-out, a deep link such as `/dashboard`, driver/passenger acceptance, and two-way chat using separate browser profiles.

The gateway keeps browser requests and the refresh cookie on the frontend origin. Cookies have no Domain attribute and use Secure in production. Do not change the Angular client to call Render directly unless you also redesign cookie/CSRF handling for cross-site deployment.

## Release checks

Run backend unit/integration tests and both production builds. Apply the migration to staging first. After deployment, verify form validation, two-user permissions, concurrent last-seat acceptance, withdrawal, history, and responsive layouts at 375, 768 and 1280 pixels. Verify HTTP-only/Secure cookie flags and that no user secrets appear in frontend bundles or responses.

Documentation references: [Supabase PostgreSQL connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [Vercel rewrites](https://vercel.com/docs/routing/rewrites), [Render Docker deployments](https://render.com/docs/docker).