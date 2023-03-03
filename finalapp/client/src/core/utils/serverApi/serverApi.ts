import {
  BASE_SERVER_URL,
  MEETUPS_URL,
  LOGIN_URL,
  LOGOUT_URL,
  NEWS_URL,
  VOTEDUSERS_URL,
} from '../../constants/serverConstants';
import IServerApi from '../../types/IServerApi';
import { Meetup } from '../../types/Meetup';
import NotificationStore from '../../../store/notificationStore';
import { User } from '../../types/User';
import { AuthorizationRequestData } from '../../types/AuthorizationRequestData';
import { News } from '../../types/News';
import Translation from '../translation';

class ServerApi implements IServerApi {
  private errorMessage = {
    unauthorized: Translation.translatedText('notification.error.unauthorized'),
    unknown: Translation.translatedText('notification.error.unknown'),
    notFound: Translation.translatedText('notification.error.notFound'),
    serverError: Translation.translatedText('notification.error.serverError'),
    wrongAuthData: Translation.translatedText(
      'notification.error.wrongAuthData',
    ),
    logout: Translation.translatedText('notification.error.logout')
  };
  private successMessage = {
    addedMeetup: Translation.translatedText('notification.success.addedMeetup'),
    deletedMeetup: Translation.translatedText(
      'notification.success.deletedMeetup',
    ),
    updatedMeetup: Translation.translatedText(
      'notification.success.updatedMeetup',
    ),
  };

  constructor(private readonly notificationStore: NotificationStore) {}

  private getErrorMessage(errorStatus: number) {
    if (errorStatus === 401) {
      return this.errorMessage.unauthorized;
    }
    if (errorStatus === 404) {
      return this.errorMessage.notFound;
    }
    if (errorStatus === 500) {
      return this.errorMessage.serverError;
    } else {
      return this.errorMessage.unknown;
    }
  }

  private async fetch(url: string, options?: object): Promise<Response | null> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorMessage = this.getErrorMessage(response.status);
        this.notificationStore.error(errorMessage);
      }

      return response;
    } catch {
      this.notificationStore.error(this.errorMessage.serverError);
      return null;
    }
  }

  // Meetups
  async getMeetupsFromServer(): Promise<Meetup[]> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`);

      if (!response?.ok) {
        return [];
      }

      return await response.json();
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return [];
    }
  }

  async updateMeetupOnServer(editedMeetup: Meetup): Promise<Meetup | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMeetup),
      });

      if (!response?.ok) {
        return null;
      }

      const meetup = await response.json();
      this.notificationStore.success(this.successMessage.updatedMeetup);

      return meetup;
    } catch {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async removeMeetupFromServerById(id: string): Promise<Meetup | null> {
    try {
      const response = await this.fetch(
        `${BASE_SERVER_URL}${MEETUPS_URL}/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response?.ok) {
        return null;
      }

      const meetup = await response.json();
      this.notificationStore.success(this.successMessage.deletedMeetup);

      return meetup;
    } catch {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async sendCreatedMeetupToServer(newMeetup: Meetup): Promise<Meetup | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeetup),
      });

      if (!response?.ok) {
        return null;
      }

      const meetup = await response.json();
      this.notificationStore.success(this.successMessage.addedMeetup);

      return meetup;
    } catch {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async getMeetupFromServerById(id: string): Promise<Meetup | null> {
    try {
      const response = await this.fetch(
        `${BASE_SERVER_URL}${MEETUPS_URL}/${id}`,
      );

      if (!response?.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async getVotedUsers(id: string): Promise<User[] | null> {
    try {
      const response = await this.fetch(
        `${BASE_SERVER_URL}${MEETUPS_URL}/${id}${VOTEDUSERS_URL}`,
      );

      if (!response?.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async sendVotedUser(id: string, user: User): Promise<User[] | null> {
    try {
      const response = await this.fetch(
        `${BASE_SERVER_URL}${MEETUPS_URL}/${id}${VOTEDUSERS_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user}),
      });

      if (!response?.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async removeVotedUser(id: string, user: User): Promise<User[] | null> {
    try {
      const response = await this.fetch(
        `${BASE_SERVER_URL}${MEETUPS_URL}/${id}${VOTEDUSERS_URL}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user}),
      });

      if (!response?.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  // User
  async tryAuthorize(authData: AuthorizationRequestData): Promise<User | null> {
    try {
      const response: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });

      if (response?.status === 401) {
        this.notificationStore.error(this.errorMessage.wrongAuthData);
        return null;
      }

      const userData = await response.json();
      return userData.user;
    } catch {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async getUserFromServer(): Promise<User | null> {
    try {
      const response: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response?.ok) {
        return null;
      }

      const userData = await response.json();
      return userData.user;
    } catch {
      console.error('Failed to retrieve user');
      return null;
    }
  }

  async logout(): Promise<Response | null> {
    try {
      const response: Response = await fetch(`${BASE_SERVER_URL}${LOGOUT_URL}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return response.json();
    } catch {
      this.notificationStore.error(this.errorMessage.logout);
      return null;
    }
  }

  // News
  async getNewsFromServer(): Promise<News[]> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${NEWS_URL}`);

      if (response === null) {
        return [];
      }

      return response.json();
    } catch {
      this.notificationStore.error(this.errorMessage.unknown);
      return [];
    }
  }

  async sendCreatedNewsToServer(newNews: News): Promise<News | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${NEWS_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNews),
      });

      if (!response?.ok) {
        return null;
      }

      const news = await response.json();
      this.notificationStore.success(this.successMessage.addedMeetup);

      return news;
    } catch {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async getNewsFromServerById(id: string): Promise<News | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${NEWS_URL}/${id}`);

      if (!response?.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }

  async updateNews(editedNews: News, id: string): Promise<News | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${NEWS_URL}/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedNews),
      });

      if (!response?.ok) {
        return null;
      }

      const news = await response.json();
      this.notificationStore.success(this.successMessage.updatedMeetup);

      return news;
    } catch (error) {
      this.notificationStore.error(this.errorMessage.unknown);
      return null;
    }
  }
}

export default ServerApi;
