import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User, Post, Interest, Message, Notification, Session } from './entities';
import { databaseSslOptions } from './ssl-options';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  schema: 'commuteconnect',
  entities: [User, Post, Interest, Session, Message, Notification],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: databaseSslOptions(process.env),
  connectTimeoutMS: 10000,
  extra: { max: 10 },
});