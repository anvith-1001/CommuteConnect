export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  sex: string;
}

export type Status = 'pending' | 'accepted' | 'declined' | 'withdrawn';

export interface Interest {
  id: string;
  postId: string;
  userId: string;
  status: Status;
  user?: { id: string; name: string };
  post?: Commute;
  pickupLat: number | null;
  pickupLng: number | null;
  boardedAt: string | null;
  rideOtp?: string | null;
}

export interface ChatMessage {
  id: string;
  interestId: string;
  senderId: string;
  sender: { id: string; name: string };
  body: string;
  createdAt: string;
}

export interface Commute {
  id: string;
  ownerId: string;
  owner: { id: string; name: string };
  origin: string;
  destination: string;
  via: string | null;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  viaLat: number | null;
  viaLng: number | null;
  departureAt: string;
  seats: number;
  availableSeats: number;
  vehicleNumber: string | null;
  notes: string;
  deletedAt: string | null;
  myInterest: Interest | null;
  rideStatus: 'scheduled' | 'in_progress' | 'completed';
  startedAt: string | null;
  endedAt: string | null;
}

export interface Page<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuthResult {
  user: User;
  accessToken: string;
}

export interface PostDraft {
  origin: string;
  destination: string;
  via?: string;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  viaLat?: number;
  viaLng?: number;
  departureAt: string;
  seats: number;
  vehicleNumber: string;
  notes: string;
}

export interface AppNotification {
  id: string;
  type:
    | 'interest_accepted'
    | 'interest_received'
    | 'new_message'
    | 'ride_started'
    | 'ride_ended';
  postId: string;
  interestId: string;
  title: string;
  body: string;
  readAt: string | null;
  createdAt: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NotificationFeed {
  data: AppNotification[];
  unreadCount: number;
}