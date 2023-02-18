import { makeAutoObservable } from 'mobx';
import { Meetup } from '../core/types/Meetup';
import ServerApi from '../core/utils/serverApi';
import ConfirmationStore from './confirmationStore';
import { defineMessage } from 'react-intl';
import Translation from '../core/utils/translation';

class MeetupsStore {
  meetups: Meetup[] = [];

  constructor(
    private readonly serverApi: ServerApi,
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

  get requestMeetups(): Meetup[] {
    return this.meetups.filter((meetup) => meetup.status === 'REQUEST');
  }

  get draftMeetups(): Meetup[] {
    return this.meetups.filter((meetup) => meetup.status === 'DRAFT');
  }

  get futureMeetups(): Meetup[] {
    return this.meetups.filter(
      (meetup) =>
        meetup.status === 'CONFIRMED' && new Date(meetup.start) > new Date(),
    );
  }

  get pastMeetups(): Meetup[] {
    return this.meetups.filter(
      (meetup) =>
        meetup.status === 'CONFIRMED' && new Date(meetup.start) < new Date(),
    );
  }

  setMeetups(meetups: Meetup[]): void {
    this.meetups = meetups;
  }
}

export default MeetupsStore;
