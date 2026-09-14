import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum Sex {
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'other',
  UNDISCLOSED = 'prefer_not_to_say',
}

export enum InterestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  WITHDRAWN = 'withdrawn',
}

export enum NotificationType {
  INTEREST_ACCEPTED = 'interest_accepted',
  INTEREST_RECEIVED = 'interest_received',
  NEW_MESSAGE = 'new_message',
  RIDE_STARTED = 'ride_started',
  RIDE_ENDED = 'ride_ended',
}

export enum RideStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('users')
@Index('users_active_email', ['email'], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 254 })
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({ type: 'date', nullable: true })
  dob: string | null;

  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex | null;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  ownerId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ length: 120 })
  origin: string;

  @Column({ length: 120 })
  destination: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  via: string | null;

  @Column({ type: 'double precision' })
  originLat: number;

  @Column({ type: 'double precision' })
  originLng: number;

  @Column({ type: 'double precision' })
  destinationLat: number;

  @Column({ type: 'double precision' })
  destinationLng: number;

  @Column({ type: 'double precision', nullable: true })
  viaLat: number | null;

  @Column({ type: 'double precision', nullable: true })
  viaLng: number | null;

  @Index()
  @Column({ type: 'timestamptz' })
  departureAt: Date;

  @Column('int')
  seats: number;

  @Column({ length: 20 })
  vehicleNumber: string;

  @Column({ type: 'text', default: '' })
  notes: string;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'enum', enum: RideStatus, default: RideStatus.SCHEDULED })
  rideStatus: RideStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  endedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

@Entity('interests')
@Unique(['postId', 'userId'])
export class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  postId: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Index()
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: InterestStatus, default: InterestStatus.PENDING })
  status: InterestStatus;

  @Column({ type: 'double precision', nullable: true })
  pickupLat: number | null;

  @Column({ type: 'double precision', nullable: true })
  pickupLng: number | null;

  @Column({ type: 'timestamptz', nullable: true })
  boardedAt: Date | null;

  @Column({ type: 'int', default: 0 })
  otpAttempts: number;

  @Column({ type: 'timestamptz', nullable: true })
  otpAttemptedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  tokenHash: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  revokedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  interestId: string;

  @ManyToOne(() => Interest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'interestId' })
  interest: Interest;

  @Index()
  @Column('uuid')
  senderId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column('uuid')
  postId: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column('uuid')
  interestId: string;

  @ManyToOne(() => Interest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'interestId' })
  interest: Interest;

  @Column({ length: 120 })
  title: string;

  @Column({ length: 240 })
  body: string;

  @Column({ type: 'timestamptz', nullable: true })
  readAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
