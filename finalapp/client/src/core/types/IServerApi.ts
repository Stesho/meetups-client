import { Meetup } from './Meetup';
import { User } from './User';
import { News } from './News';
import { AuthorizationRequestData } from './AuthorizationRequestData';

interface IServerApi {
  // Meetups
  getMeetupsFromServer(): Promise<Meetup[]>;
  updateMeetupOnServer(editedMeetup: Meetup): Promise<Meetup | null>;
  removeMeetupFromServerById(id: string): Promise<Meetup | null>;
  sendCreatedMeetupToServer(newMeetup: Meetup): Promise<Meetup | null>;
  getMeetupFromServerById(id: string): Promise<Meetup | null>;
  tryAuthorize(authData: AuthorizationRequestData): Promise<User | null>;
  getVotedUsers(id: string): Promise<User[] | null>;
  sendVotedUser(id: string, user: User): Promise<User[] | null>;
  removeVotedUser(id: string, user: User): Promise<User[] | null>;
  getParticipants(id: string): Promise<User[] | null>;
  sendParticipant(id: string, user: User): Promise<User[] | null>;
  removeParticipant(id: string, user: User): Promise<User[] | null>;

  //User
  tryAuthorize(authData: AuthorizationRequestData): Promise<User | null>;
  getUserFromServer(): Promise<User | null>;
  logout(): Promise<Response | null>

  //News
  getNewsFromServer(): Promise<News[]>;
  sendCreatedNewsToServer(newNews: News): Promise<News | null>;
  getNewsFromServerById(id: string): Promise<News | null>;
}

export default IServerApi;
