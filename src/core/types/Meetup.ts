import { ShortUser } from './User';

export interface Meetup {
  id: string;
  modified: string;
  start: string;
  finish: string;
  author: ShortUser;
  speakers: Array<ShortUser>;
  subject: string;
  excerpt: string;
  place: string;
  votedUsersCount: number;
  participantsCount: number;
  status: 'DRAFT' | 'REQUEST' | 'CONFIRMED';
  isOver: boolean;
  image?: string | null;
}

export type CreatedMeetup = Partial<Omit<
  Meetup,
  'goCount' | 'status' | 'isOver' | 'id'
>>;
