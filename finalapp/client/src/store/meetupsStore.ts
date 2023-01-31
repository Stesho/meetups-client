import { makeAutoObservable } from "mobx"
import { Meetup } from "../core/types/Meetup";
import { getMeetupsFromServer } from '../core/utils/getMeetupsFromServer'
import { removeMeetupFromServerById } from "../core/utils/removeMeetupFromServer";
import { sendCreatedMeetupToServer } from "../core/utils/sendCreatedMeetupToServer";
import { updateMeetupOnServer } from "../core/utils/updateMeetupOnServer";

class MeetupsStore {
  meetups: Meetup[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  async addMeetup(meetup: Meetup): Promise<void> {
    const response = await sendCreatedMeetupToServer(meetup)

    if(typeof response === 'object') {
      this.meetups.push(meetup)
    }
  }

  async deleteMeetupById(id: string): Promise<void> {
    const response = await removeMeetupFromServerById(id)
    
    if(response !== null) {
      const newMeetups = this.meetups.filter(meetup => meetup.id !== id)
      this.setMeetups(newMeetups)
    }
  }

  async editMeetup(meetup: Meetup): Promise<void> {
    const response = await updateMeetupOnServer(meetup)

    if(typeof response === 'object') {
      const editedMeetupIndex = this.meetups.findIndex(item => item.id === meetup.id)
      this.meetups[editedMeetupIndex] = meetup
    }
  }

  async fetchMeetups(): Promise<void> {
    const recievedMeetups = await getMeetupsFromServer()
    this.setMeetups(recievedMeetups)
  }

  get requestMeetups(): Meetup[] {
    return this.meetups.filter(meetup => meetup.status === 'REQUEST')
  }

  get draftMeetups(): Meetup[] {
    return this.meetups.filter(meetup => meetup.status === 'DRAFT')
  }

  get futureMeetups(): Meetup[] {
    return this.meetups.filter(meetup => (
      meetup.status === 'CONFIRMED' && (new Date(meetup.start) > new Date())
    ))
  }

  get pastMeetups(): Meetup[] {
    return this.meetups.filter(meetup => (
      meetup.status === 'CONFIRMED' && (new Date(meetup.start) < new Date())
    ))
  }

  setMeetups(meetups: Meetup[]): void {
    this.meetups = meetups
  }
}

export default MeetupsStore;