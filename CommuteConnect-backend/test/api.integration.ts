import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { setup } from '../src/setup';
import {
  User,
  Post,
  Interest,
  InterestStatus,
  Message,
  Notification,
  Session,
} from '../src/database/entities';
import { randomUUID } from 'crypto';
import { AppModule } from '../src/app.module';
import * as argon2 from 'argon2';

describe('CommuteConnect API with real PostgreSQL', () => {
  let app: INestApplication;
  let db: DataSource;
  const password = 'a-long-test-passphrase';
  const future = () => new Date(Date.now() + 86400000).toISOString();
  const draft = () => ({
    origin: 'Indiranagar',
    destination: 'Whitefield',
    via: 'Domlur',
    originLat: 12.9784,
    originLng: 77.6408,
    destinationLat: 12.9698,
    destinationLng: 77.75,
    viaLat: 12.9609,
    viaLng: 77.6387,
    departureAt: future(),
    seats: 1,
    vehicleNumber: 'KA01AB1234',
    notes: 'Metro station pickup',
  });
  const register = (email: string) =>
    request(app.getHttpServer()).post('/api/auth/register').send({
      name: 'Test Passenger',
      email,
      password,
      dob: '1995-06-15',
      sex: 'prefer_not_to_say',
    });
  const bearer = (token: string) => `Bearer ${token}`;
  const pickup = { pickupLat: 12.9784, pickupLng: 77.6408 };

  async function accounts() {
    const owner = await register('owner@example.test');
    const rider = await register('rider@example.test');

    return { owner: owner.body, rider: rider.body };
  }

  async function create(token: string) {
    return request(app.getHttpServer())
      .post('/api/posts')
      .set('Authorization', bearer(token))
      .send(draft());
  }

  beforeAll(async () => {
    if (
      process.env.CC_ISOLATED_TEST !== 'true' ||
      !process.env.DATABASE_URL?.includes('/commuteconnect_test')
    ) {
      throw new Error('Tests require the isolated runner.');
    }

    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication();
    setup(app);
    await app.init();
    db = app.get(DataSource);
    await db.query('CREATE SCHEMA IF NOT EXISTS commuteconnect');
    await db.runMigrations();
  });

  beforeEach(async () => {
    await db.query('TRUNCATE commuteconnect.users CASCADE');
    // Each test has a fresh app-level throttle store to avoid testing the limiter accidentally.
    const storage = app.get(require('@nestjs/throttler').ThrottlerStorage);
    storage.storage?.clear();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('hashes passwords, normalizes emails, and never exposes password hashes', async () => {
    const res = await register('  Alice@Example.test  ');
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('alice@example.test');
    expect(JSON.stringify(res.body)).not.toContain('passwordHash');
    const user = await db
      .getRepository(User)
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .getOneOrFail();
    expect(await argon2.verify(user.passwordHash, password)).toBe(true);
    expect(res.headers['set-cookie'][0]).toContain('HttpOnly');
    expect(res.headers['set-cookie'][0]).toContain('SameSite=Lax');
  });

  it('rejects invalid fields, calendar dates, and duplicate emails', async () => {
    expect((await register('a@example.test')).status).toBe(201);
    expect((await register('a@example.test')).status).toBe(409);
    const invalid = await request(app.getHttpServer()).post('/api/auth/register').send({
      name: 'Test',
      email: 'b@example.test',
      password,
      dob: '2000-02-31',
      sex: 'male',
    });
    expect(invalid.status).toBe(400);
    expect(
      (
        await request(app.getHttpServer())
          .post('/api/auth/login')
          .send({ email: 'x', password, admin: true })
      ).status,
    ).toBe(400);
  });

  it('logs in and returns a generic invalid-credentials error', async () => {
    await register('a@example.test');
    const login = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'A@example.test', password });
    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeTruthy();
    const wrong = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'a@example.test', password: 'wrong' });
    expect(wrong.status).toBe(401);
    expect(wrong.body.message).toBe('Email or password is incorrect.');
  });

  it('rotates refresh tokens, rejects replay, and revokes access on logout', async () => {
    const user = await register('a@example.test');
    const oldCookie = user.headers['set-cookie'][0].split(';')[0];
    const refresh = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .set('Cookie', oldCookie);
    expect(refresh.status).toBe(200);
    expect(
      (
        await request(app.getHttpServer())
          .post('/api/auth/refresh')
          .set('Cookie', oldCookie)
      ).status,
    ).toBe(401);
    const cookie = refresh.headers['set-cookie'][0].split(';')[0];
    expect(
      (await request(app.getHttpServer()).post('/api/auth/logout').set('Cookie', cookie))
        .status,
    ).toBe(204);
    expect(
      (
        await request(app.getHttpServer())
          .get('/api/users/me')
          .set('Authorization', bearer(refresh.body.accessToken))
      ).status,
    ).toBe(401);
  });

  it('rejects untrusted browser origins and unauthenticated post access', async () => {
    expect(
      (
        await request(app.getHttpServer())
          .post('/api/auth/login')
          .set('Origin', 'https://evil.example')
          .send({ email: 'a@example.test', password })
      ).status,
    ).toBe(403);
    expect((await request(app.getHttpServer()).get('/api/posts')).status).toBe(401);
  });

  it('protects edits, deletion, and applicant details with ownership checks', async () => {
    const { owner, rider } = await accounts();
    const p = await create(owner.accessToken);
    expect(p.status).toBe(201);

    for (const method of ['put', 'delete', 'get'] as const) {
      const url = '/api/posts/' + p.body.id + (method === 'get' ? '/interests' : '');
      const call = request(app.getHttpServer())
        [method](url)
        .set('Authorization', bearer(rider.accessToken));
      expect((await (method === 'put' ? call.send({ seats: 2 }) : call)).status).toBe(
        403,
      );
    }

    expect(
      (
        await request(app.getHttpServer())
          .post(`/api/posts/${p.body.id}/interests`)
          .set('Authorization', bearer(owner.accessToken))
          .send(pickup)
      ).status,
    ).toBe(403);
  });

  it('validates future departures, different locations and seat bounds', async () => {
    const user = (await register('a@example.test')).body;

    for (const change of [
      { departureAt: '2020-01-01T00:00:00Z' },
      { destination: 'indiranagar' },
      { seats: 0 },
      { seats: 1.5 },
    ]) {
      expect(
        (
          await request(app.getHttpServer())
            .post('/api/posts')
            .set('Authorization', bearer(user.accessToken))
            .send({ ...draft(), ...change })
        ).status,
      ).toBe(400);
    }
  });

  it('filters and paginates deterministically without treating SQL as executable', async () => {
    const user = (await register('a@example.test')).body;
    await create(user.accessToken);
    await create(user.accessToken);
    const result = await request(app.getHttpServer())
      .get('/api/posts?origin=INDIRA&limit=1&page=2')
      .set('Authorization', bearer(user.accessToken));
    expect(result.status).toBe(200);
    expect(result.body.total).toBe(2);
    expect(result.body.data).toHaveLength(1);
    const empty = await request(app.getHttpServer())
      .get('/api/posts')
      .query({ origin: "' OR 1=1 --" })
      .set('Authorization', bearer(user.accessToken));
    expect(empty.body.total).toBe(0);
    expect(
      (
        await request(app.getHttpServer())
          .get('/api/posts?limit=10000')
          .set('Authorization', bearer(user.accessToken))
      ).status,
    ).toBe(400);
  });

  it('finds close route spellings', async () => {
    const user = (await register('a@example.test')).body;
    await create(user.accessToken);
    const result = await request(app.getHttpServer())
      .get('/api/posts?origin=Indranagr&destination=Whitefeld')
      .set('Authorization', bearer(user.accessToken));

    expect(result.status).toBe(200);
    expect(result.body.total).toBe(1);
  });

  it('matches origin and destination filters only against their own route fields', async () => {
    const user = (await register('route-fields@example.test')).body;
    await create(user.accessToken);

    const wrongOrigin = await request(app.getHttpServer())
      .get('/api/posts?origin=Whitefield')
      .set('Authorization', bearer(user.accessToken));
    const wrongDestination = await request(app.getHttpServer())
      .get('/api/posts?destination=Indiranagar')
      .set('Authorization', bearer(user.accessToken));

    expect(wrongOrigin.body.total).toBe(0);
    expect(wrongDestination.body.total).toBe(0);
  });

  it('updates a profile while keeping email immutable', async () => {
    const account = (await register('a@example.test')).body;
    const response = await request(app.getHttpServer())
      .patch('/api/users/me')
      .set('Authorization', bearer(account.accessToken))
      .send({
        name: 'Updated Name',
        dob: '1994-05-12',
        sex: 'female',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'Updated Name',
      email: 'a@example.test',
      dob: '1994-05-12',
      sex: 'female',
    });
  });

  it('prevents duplicate interest, including concurrent requests', async () => {
    const { owner, rider } = await accounts();
    const p = await create(owner.accessToken);
    const results = await Promise.all(
      [1, 2].map(() =>
        request(app.getHttpServer())
          .post(`/api/posts/${p.body.id}/interests`)
          .set('Authorization', bearer(rider.accessToken))
          .send(pickup),
      ),
    );
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
  });

  it('accepts only one passenger when two requests race for the last seat', async () => {
    const { owner, rider } = await accounts();
    const other = (await register('other@example.test')).body;
    const p = await create(owner.accessToken);
    const a = await request(app.getHttpServer())
      .post(`/api/posts/${p.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    const b = await request(app.getHttpServer())
      .post(`/api/posts/${p.body.id}/interests`)
      .set('Authorization', bearer(other.accessToken))
      .send(pickup);
    const results = await Promise.all(
      [a, b].map((i) =>
        request(app.getHttpServer())
          .patch(`/api/interests/${i.body.id}/decision`)
          .set('Authorization', bearer(owner.accessToken))
          .send({ status: 'accepted' }),
      ),
    );
    expect(results.map((r) => r.status).sort()).toEqual([200, 409]);
    expect(
      await db
        .getRepository(Interest)
        .countBy({ postId: p.body.id, status: InterestStatus.ACCEPTED }),
    ).toBe(1);
  });

  it('keeps a commute discoverable until every seat is assigned', async () => {
    const { owner, rider } = await accounts();
    const outsider = (await register('outsider@example.test')).body;
    const post = await request(app.getHttpServer())
      .post('/api/posts')
      .set('Authorization', bearer(owner.accessToken))
      .send({ ...draft(), seats: 3 });
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);

    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });

    const search = await request(app.getHttpServer())
      .get('/api/posts')
      .set('Authorization', bearer(outsider.accessToken));
    const ownerDashboard = await request(app.getHttpServer())
      .get('/api/posts/mine?view=current')
      .set('Authorization', bearer(owner.accessToken));
    const riderDashboard = await request(app.getHttpServer())
      .get('/api/interests/mine?view=current')
      .set('Authorization', bearer(rider.accessToken));

    expect(search.body.total).toBe(1);
    expect(search.body.data[0].availableSeats).toBe(2);
    expect(search.body.data[0].vehicleNumber).toBeNull();
    expect(ownerDashboard.body.total).toBe(1);
    expect(ownerDashboard.body.data[0].vehicleNumber).toBe('KA01AB1234');
    expect(riderDashboard.body.total).toBe(1);
    expect(riderDashboard.body.data[0].post.vehicleNumber).toBe('KA01AB1234');
  });

  it('releases an accepted seat on withdrawal and permits renewed interest', async () => {
    const { owner, rider } = await accounts();
    const p = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${p.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/withdraw`)
          .set('Authorization', bearer(owner.accessToken))
      ).status,
    ).toBe(403);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/withdraw`)
          .set('Authorization', bearer(rider.accessToken))
      ).status,
    ).toBe(200);
    const detail = await request(app.getHttpServer())
      .get(`/api/posts/${p.body.id}`)
      .set('Authorization', bearer(rider.accessToken));
    expect(detail.body.availableSeats).toBe(1);
    expect(
      (
        await request(app.getHttpServer())
          .post(`/api/posts/${p.body.id}/interests`)
          .set('Authorization', bearer(rider.accessToken))
          .send(pickup)
      ).status,
    ).toBe(201);
  });

  it('keeps declined interests in history and denies invalid transitions', async () => {
    const { owner, rider } = await accounts();
    const p = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${p.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/decision`)
          .set('Authorization', bearer(rider.accessToken))
          .send({ status: 'accepted' })
      ).status,
    ).toBe(403);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/decision`)
          .set('Authorization', bearer(owner.accessToken))
          .send({ status: 'declined' })
      ).status,
    ).toBe(200);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/decision`)
          .set('Authorization', bearer(owner.accessToken))
          .send({ status: 'accepted' })
      ).status,
    ).toBe(409);
    const history = await request(app.getHttpServer())
      .get('/api/interests/mine?view=history')
      .set('Authorization', bearer(rider.accessToken));
    expect(history.body.total).toBe(1);
  });

  it('preserves cancelled posts in owner and passenger history but hides them from search', async () => {
    const { owner, rider } = await accounts();
    const p = await create(owner.accessToken);
    await request(app.getHttpServer())
      .post(`/api/posts/${p.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    expect(
      (
        await request(app.getHttpServer())
          .delete(`/api/posts/${p.body.id}`)
          .set('Authorization', bearer(owner.accessToken))
      ).status,
    ).toBe(204);
    const list = await request(app.getHttpServer())
      .get('/api/posts')
      .set('Authorization', bearer(rider.accessToken));
    expect(list.body.total).toBe(0);

    for (const [path, token] of [
      ['/api/posts/mine?view=history', owner.accessToken],
      ['/api/interests/mine?view=history', rider.accessToken],
    ]) {
      expect(
        (await request(app.getHttpServer()).get(path).set('Authorization', bearer(token)))
          .body.total,
      ).toBe(1);
    }
  });

  it('only permits seat-count edits and protects accepted seat allocations', async () => {
    const { owner, rider } = await accounts();
    const p = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${p.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });
    const routeEdit = await request(app.getHttpServer())
      .put(`/api/posts/${p.body.id}`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ seats: 2, destination: 'Airport' });
    const tooFewSeats = await request(app.getHttpServer())
      .put(`/api/posts/${p.body.id}`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ seats: 0 });
    const validEdit = await request(app.getHttpServer())
      .put(`/api/posts/${p.body.id}`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ seats: 2 });

    expect(routeEdit.status).toBe(400);
    expect(tooFewSeats.status).toBe(400);
    expect(validEdit.status).toBe(200);
    expect(validEdit.body).toMatchObject({
      seats: 2,
      destination: 'Whitefield',
      vehicleNumber: 'KA01AB1234',
    });
  });

  it('creates private, persistent notifications for acceptance and chat', async () => {
    const { owner, rider } = await accounts();
    const post = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);

    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });
    await request(app.getHttpServer())
      .post(`/api/interests/${interest.body.id}/messages`)
      .set('Authorization', bearer(rider.accessToken))
      .send({ body: 'I am near the pickup point.' });

    const riderFeed = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', bearer(rider.accessToken));
    const ownerFeed = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', bearer(owner.accessToken));

    expect(riderFeed.body.unreadCount).toBe(1);
    expect(riderFeed.body.data[0].type).toBe('interest_accepted');
    expect(ownerFeed.body.unreadCount).toBe(2);
    expect(ownerFeed.body.data[0]).toMatchObject({
      type: 'new_message',
      body: 'I am near the pickup point.',
    });

    await request(app.getHttpServer())
      .patch(`/api/notifications/${ownerFeed.body.data[0].id}/read`)
      .set('Authorization', bearer(owner.accessToken));
    const readFeed = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', bearer(owner.accessToken));

    expect(readFeed.body.unreadCount).toBe(1);
    expect(await db.getRepository(Notification).count()).toBe(3);
  });

  it('opens chat only after acceptance and only to its two participants', async () => {
    const { owner, rider } = await accounts();
    const outsider = (await register('outsider@example.test')).body;
    const post = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    const path = `/api/interests/${interest.body.id}/messages`;

    expect(
      (
        await request(app.getHttpServer())
          .get(path)
          .set('Authorization', bearer(rider.accessToken))
      ).status,
    ).toBe(403);

    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });

    expect(
      (
        await request(app.getHttpServer())
          .post(path)
          .set('Authorization', bearer(outsider.accessToken))
          .send({ body: 'Hello' })
      ).status,
    ).toBe(403);
    expect(
      (
        await request(app.getHttpServer())
          .post(path)
          .set('Authorization', bearer(rider.accessToken))
          .send({ body: 'Where should we meet?' })
      ).status,
    ).toBe(201);
    const messages = await request(app.getHttpServer())
      .get(path)
      .set('Authorization', bearer(owner.accessToken));
    expect(messages.status).toBe(200);
    expect(messages.body[0]).toMatchObject({
      senderId: rider.user.id,
      body: 'Where should we meet?',
    });
  });

  it('keeps passenger OTP private and enforces the verified ride lifecycle', async () => {
    const { owner, rider } = await accounts();
    const post = await request(app.getHttpServer())
      .post('/api/posts')
      .set('Authorization', bearer(owner.accessToken))
      .send({
        ...draft(),
        departureAt: new Date(Date.now() + 3600000).toISOString(),
      });
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);

    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });

    const riderView = await request(app.getHttpServer())
      .get(`/api/posts/${post.body.id}`)
      .set('Authorization', bearer(rider.accessToken));
    const ownerPassengers = await request(app.getHttpServer())
      .get(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(owner.accessToken));
    const otp = riderView.body.myInterest.rideOtp;
    const wrongOtp = otp === '000000' ? '111111' : '000000';

    expect(otp).toMatch(/^\d{6}$/);
    expect(JSON.stringify(ownerPassengers.body)).not.toContain(otp);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/verify-otp`)
          .set('Authorization', bearer(owner.accessToken))
          .send({ otp: wrongOtp })
      ).status,
    ).toBe(403);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/interests/${interest.body.id}/verify-otp`)
          .set('Authorization', bearer(owner.accessToken))
          .send({ otp })
      ).status,
    ).toBe(200);
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/posts/${post.body.id}/ride/start`)
          .set('Authorization', bearer(owner.accessToken))
      ).body.rideStatus,
    ).toBe('in_progress');
    expect(
      (
        await request(app.getHttpServer())
          .patch(`/api/posts/${post.body.id}/ride/end`)
          .set('Authorization', bearer(owner.accessToken))
      ).body.rideStatus,
    ).toBe('completed');
    expect(
      (
        await request(app.getHttpServer())
          .post(`/api/interests/${interest.body.id}/messages`)
          .set('Authorization', bearer(rider.accessToken))
          .send({ body: 'This must stay read-only.' })
      ).status,
    ).toBe(403);

    const history = await request(app.getHttpServer())
      .get('/api/interests/mine?view=history')
      .set('Authorization', bearer(rider.accessToken));
    const notifications = await request(app.getHttpServer())
      .get('/api/notifications')
      .set('Authorization', bearer(rider.accessToken));

    expect(history.body.total).toBe(1);
    expect(notifications.body.data.map((item: Notification) => item.type)).toEqual(
      expect.arrayContaining(['interest_accepted', 'ride_started', 'ride_ended']),
    );
  });

  it('returns the newest 100 chat messages in chronological order', async () => {
    const { owner, rider } = await accounts();
    const post = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });

    const start = Date.now() - 105000;
    await db.getRepository(Message).insert(
      Array.from({ length: 105 }, (_, index) => ({
        interestId: interest.body.id,
        senderId: rider.user.id,
        body: `Message ${index + 1}`,
        createdAt: new Date(start + index * 1000),
      })),
    );

    const response = await request(app.getHttpServer())
      .get(`/api/interests/${interest.body.id}/messages`)
      .set('Authorization', bearer(owner.accessToken));

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(100);
    expect(response.body[0].body).toBe('Message 6');
    expect(response.body[99].body).toBe('Message 105');
  });

  it('deletes operational account data while retaining the legal identity record', async () => {
    const { owner, rider } = await accounts();
    const post = await create(owner.accessToken);
    const interest = await request(app.getHttpServer())
      .post(`/api/posts/${post.body.id}/interests`)
      .set('Authorization', bearer(rider.accessToken))
      .send(pickup);
    await request(app.getHttpServer())
      .patch(`/api/interests/${interest.body.id}/decision`)
      .set('Authorization', bearer(owner.accessToken))
      .send({ status: 'accepted' });
    await request(app.getHttpServer())
      .post(`/api/interests/${interest.body.id}/messages`)
      .set('Authorization', bearer(rider.accessToken))
      .send({ body: 'Pickup message' });

    const response = await request(app.getHttpServer())
      .delete('/api/users/me')
      .set('Authorization', bearer(owner.accessToken))
      .send({ password });

    expect(response.status).toBe(204);
    expect(response.headers['set-cookie'][0]).toContain('cc_refresh=;');
    expect(await db.getRepository(Post).count()).toBe(0);
    expect(await db.getRepository(Interest).count()).toBe(0);
    expect(await db.getRepository(Message).count()).toBe(0);
    expect(await db.getRepository(Session).countBy({ userId: owner.user.id })).toBe(0);
    const retained = await db.getRepository(User).findOneByOrFail({ id: owner.user.id });
    expect(retained).toMatchObject({
      name: 'Test Passenger',
      email: 'owner@example.test',
      dob: null,
      sex: null,
    });
    expect(retained.deletedAt).toBeInstanceOf(Date);
    expect(
      (
        await request(app.getHttpServer())
          .post('/api/auth/login')
          .send({ email: 'owner@example.test', password })
      ).status,
    ).toBe(401);

    const replacement = await register('owner@example.test');

    expect(replacement.status).toBe(201);
    expect(replacement.body.user.id).not.toBe(owner.user.id);
  });

  it('returns meaningful 404 and validation errors', async () => {
    const user = (await register('a@example.test')).body;
    expect(
      (
        await request(app.getHttpServer())
          .get('/api/posts/' + randomUUID())
          .set('Authorization', bearer(user.accessToken))
      ).status,
    ).toBe(404);
    expect(
      (
        await request(app.getHttpServer())
          .get('/api/posts/not-a-uuid')
          .set('Authorization', bearer(user.accessToken))
      ).status,
    ).toBe(400);
  });

  it('treats a missing refresh cookie as a signed-out browser', async () => {
    expect((await request(app.getHttpServer()).post('/api/auth/refresh')).status).toBe(
      204,
    );
    expect(
      (
        await request(app.getHttpServer())
          .post('/api/auth/refresh')
          .set(
            'Cookie',
            'cc_refresh=------------------------------------.' + 'a'.repeat(64),
          )
      ).status,
    ).toBe(401);
  });

  it('throttles repeated login attempts', async () => {
    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'missing@example.test', password });
    }

    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'missing@example.test', password });
    expect(response.status).toBe(429);
  });

  it('can roll back and reapply the migration in the isolated database', async () => {
    await db.undoLastMigration();
    await db.runMigrations();
    expect(await db.getRepository(User).count()).toBe(0);
  });
});