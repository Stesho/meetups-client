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

  //User
  tryAuthorize(authData: AuthorizationRequestData): Promise<User | null>;
  getUserFromServer(): Promise<User | null>;

  //News
  getNewsFromServer(): Promise<News[]>;
  sendCreatedNewsToServer(newNews: News): Promise<News | null>;
  getNewsFromServerById(id: string): Promise<News | null>;
}

export default IServerApi;
