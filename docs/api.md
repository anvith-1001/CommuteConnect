# API reference

Base: `/api`. JSON bodies. All routes except auth and health require `Authorization: Bearer <accessToken>`.

| Method | Route                     | Purpose                                                 |
| ------ | ------------------------- | ------------------------------------------------------- |
| POST   | `/auth/register`          | Create user and session; 201                            |
| POST   | `/auth/login`             | Authenticate; 200                                       |
| POST   | `/auth/refresh`           | Rotate cookie refresh credential, issue access JWT; 200 (204 without a cookie) |
| POST   | `/auth/logout`            | Revoke cookie's session; 204                            |
| GET    | `/users/me`               | Private profile                                         |
| PATCH  | `/users/me`               | Update name, DOB and sex                                |
| DELETE | `/users/me`               | Password-confirmed account deletion; 204                |
| GET    | `/posts`                  | Upcoming feed; `origin`, `destination`, `page`, `limit` |
| GET    | `/posts/mine`             | Own posts; `view=current\|history`, `page`, `limit`     |
| POST   | `/posts`                  | Offer commute; 201                                      |
| GET    | `/posts/:id`              | Commute, owner name, availability and own interest      |
| PUT    | `/posts/:id`              | Replace editable fields; owner only                     |
| DELETE | `/posts/:id`              | Cancel post while retaining history; owner only; 204    |
| POST   | `/posts/:id/interests`    | Express/renew withdrawn interest; 201                   |
| GET    | `/posts/:id/interests`    | Paginated passenger names/status; owner only            |
| GET    | `/interests/mine`         | Own interests; `view=current\|history`, `page`, `limit` |
| PATCH  | `/interests/:id/decision` | Accept/decline pending interest; owner only             |
| PATCH  | `/interests/:id/withdraw` | Withdraw pending/accepted interest; passenger only      |
| GET    | `/interests/:id/messages` | Last 100 chat messages; accepted participants only      |
| POST   | `/interests/:id/messages` | Send a chat message; accepted participants only         |
| GET    | `/health`                 | Readiness; database query must succeed                  |

Real-time chat uses Socket.IO namespace `/chat` and transport path `/socket.io`. The access JWT is sent in the socket authentication payload. Clients join and send only by interest ID; the server checks accepted status and participant identity before every operation.

Registration:

```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "password": "a-long-unique-passphrase",
  "dob": "1995-06-15",
  "sex": "prefer_not_to_say"
}
```

Post creation/update (use an actual future timestamp):

```json
{
  "origin": "Indiranagar",
  "destination": "Whitefield",
  "departureAt": "2030-10-12T08:30:00+05:30",
  "seats": 3,
  "vehicleNumber": "KA01AB1234",
  "notes": "Meet at the metro station entrance."
}
```

Decision: `{"status":"accepted"}` or `{"status":"declined"}`. Unexpected fields are rejected. Notes default to an empty string when omitted from a full post replacement.

Paginated response: `{"data":[],"total":0,"page":1,"limit":12,"totalPages":0}`. Page starts at 1; limit is 1–50, default 12. Past/cancelled posts are absent from discovery.

Errors: `{"statusCode":409,"message":"The last seat has already been taken.","path":"/api/interests/.../decision","requestId":"..."}`. Validation messages may be an array of strings. Statuses distinguish 400 invalid input, 401 invalid session, 403 permissions, 404 missing resource, 409 lifecycle/capacity conflict, 429 rate limit, and 500 unexpected server failure.

`deletedAt` on a post means cancelled. An accepted interest on a cancelled post is historical, not an active reservation. Availability is total seats minus accepted interests and should only be interpreted as bookable when the post is upcoming and not cancelled.