import { makeAutoObservable } from 'mobx';
import { Meetup } from '../../core/types/Meetup';
import { User } from '../../core/types/User';
import ConfirmationStore from '../confirmationStore';
import Translation from '../../core/utils/translation';
import IServerApi from '../../core/types/IServerApi';

class MeetupsStore {
  meetups: Meetup[] = [];

  constructor(
    private readonly serverApi: IServerApi,
    private readonly confirmationStore: ConfirmationStore,
  ) {
    makeAutoObservable(this);
  }

  private async deleteMeetupById(id: string): Promise<void> {
    const response = await this.serverApi.removeMeetupFromServerById(id);

    if (response !== null) {
      const newMeetups = this.meetups.filter((meetup) => meetup.id !== id);
      this.setMeetups(newMeetups);
    }
  }

  async addMeetup(meetup: Meetup): Promise<void> {
    const response = await this.serverApi.sendCreatedMeetupToServer(meetup);

    if (response !== null) {
      this.meetups.push(meetup);
    }
  }

  deleteMeetup(meetup: Meetup): void {
    const onConfirmModal = () => {
      this.deleteMeetupById(meetup.id);
    };
    this.confirmationStore.show(
      Translation.translatedText('confirmation.title'),
      Translation.plainText(meetup.subject),
      onConfirmModal,
    );
  }

  async editMeetup(meetup: Meetup): Promise<void> {
    const response = await this.serverApi.updateMeetupOnServer(meetup);

    if (response !== null) {
      const editedMeetupIndex = this.meetups.findIndex(
        (item) => item.id === meetup.id,
      );
      this.meetups[editedMeetupIndex] = meetup;
    }
  }

  async getMeetupById(id: string): Promise<Meetup | null> {
    const meetup = await this.serverApi.getMeetupFromServerById(id);
    return meetup;
  }

  async fetchMeetups(): Promise<void> {
    const recievedMeetups = await this.serverApi.getMeetupsFromServer();
    this.setMeetups(recievedMeetups);
  }

  async getVotedusers(meetupId: string): Promise<User[]> {
    const votedUsers = await this.serverApi.getVotedUsers(meetupId);
    return votedUsers || [];
  }
  
  async addVoteduser(meetupId: string, user: User): Promise<User[] | null> {
    const votedUsers = await this.serverApi.sendVotedUser(meetupId, user);
    this.meetups = this.meetups.map((meetup) => {
      if(meetup.id === meetupId) {
        meetup.votedUsersCount++;
      }
      return meetup;
    })
    return votedUsers;
  }

  async deleteVoteduser(meetupId: string, user: User): Promise<User[] | null> {
    const votedUsers = await this.serverApi.removeVotedUser(meetupId, user);
    return votedUsers;
  }

  get requestMeetups(): Meetup[] {
    return (
      this.meetups
      .filter((meetup) => meetup.status === 'REQUEST')
      .sort((a, b) => new Date(b.modified) < new Date(a.modified) ? 1 : -1)
    );
  }

  get draftMeetups(): Meetup[] {
    return (
      this.meetups
      .filter((meetup) => meetup.status === 'DRAFT')
      .sort((a, b) => new Date(b.start) < new Date(a.start) ? 1 : -1)
    );
  }

  get futureMeetups(): Meetup[] {
    return (
      this.meetups
      .filter((meetup) => (
        meetup.status === 'CONFIRMED' && new Date(meetup.start) > new Date()
      ))
      .sort((a, b) => new Date(b.start) < new Date(a.start) ? 1 : -1)
    );
  }

  get pastMeetups(): Meetup[] {
    return (
      this.meetups
      .filter((meetup) => (
        meetup.status === 'CONFIRMED' && new Date(meetup.start) < new Date()
      ))
      .sort((a, b) => new Date(b.finish) > new Date(a.finish) ? 1 : -1)
    );
  }

  setMeetups(meetups: Meetup[]): void {
    this.meetups = meetups;
  }
}

export default MeetupsStore;
