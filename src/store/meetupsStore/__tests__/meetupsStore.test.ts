import { Meetup } from '../../../core/types/Meetup';
import MeetupsStore from '../meetupsStore';
import ConfirmationStore from '../../confirmationStore';
import mockServerApi from '../../../mocks/mockServerApi';
import meetups from './meetups.json';

describe('meetupStore', () => {
  let meetupsStore: MeetupsStore;

  beforeEach(async () => {
    jest.clearAllMocks();
    const confirmationStore = new ConfirmationStore();
    meetupsStore = new MeetupsStore(mockServerApi, confirmationStore);
    mockServerApi.getMeetupsFromServer.mockReturnValue(
      Promise.resolve(meetups),
    );
    await meetupsStore.fetchMeetups();
  });

  it('should return array of meetups', async () => {
    expect(mockServerApi.getMeetupsFromServer).toHaveBeenCalledTimes(1);
    expect(meetupsStore.meetups).toEqual(meetups);
  });

  describe('edit meetup', () => {
    beforeEach(() => {
      mockServerApi.updateMeetupOnServer.mockImplementation((editedMeetup) => {
        const meetup = meetups.find((meetup) => meetup.id === editedMeetup.id);
        return meetup || null;
      });
    });

    it('should rewrite passed meetup', async () => {
      const editedMeetup = { ...meetups[0], subject: 'new subject' };
      await meetupsStore.editMeetup(editedMeetup as Meetup);

      expect(mockServerApi.updateMeetupOnServer).toHaveBeenCalledTimes(1);
      expect(meetupsStore.meetups[0]).toEqual(editedMeetup);
    });

    it('should do nothing if passed meetup not found', async () => {
      const fakeMeetup = { ...meetups[0], id: 'fake id' };
      await meetupsStore.editMeetup(fakeMeetup as Meetup);

      expect(mockServerApi.updateMeetupOnServer).toHaveBeenCalledTimes(1);
      expect(meetupsStore.meetups).toEqual(meetups);
    });
  });

  describe('get meetup by id', () => {
    beforeEach(() => {
      mockServerApi.getMeetupFromServerById.mockImplementation((id) => {
        const meetup = meetups.find((meetup) => meetup.id === id);
        return meetup || null;
      });
    });

    it('should return meetup with passed id', async () => {
      const meetup = await meetupsStore.getMeetupById(meetups[1].id);

      expect(mockServerApi.getMeetupFromServerById).toBeCalledTimes(1);
      expect(meetup).toEqual(meetups[1]);
    });

    it('should return null if meetup is not found', async () => {
      const meetup = await meetupsStore.getMeetupById('fake id');

      expect(mockServerApi.getMeetupFromServerById).toBeCalledTimes(1);
      expect(meetup).toEqual(null);
    });
  });

  describe('add meetup', () => {
    beforeEach(() => {
      mockServerApi.sendCreatedMeetupToServer.mockImplementation(
        (meetup) => meetup,
      );
    });

    it('should push meetup to meetups store', async () => {
      const newMeetups = [...meetups, meetups[0]];
      await meetupsStore.addMeetup(meetups[0] as Meetup);

      expect(mockServerApi.sendCreatedMeetupToServer).toBeCalledTimes(1);
      expect(meetupsStore.meetups).toEqual(newMeetups);
    });
  });

  describe('meetups by status', () => {
    it('should return meetups with "request" status', () => {
      const requestMeetups = meetups.filter(
        (meetup) => meetup.status === 'REQUEST',
      );

      expect(meetupsStore.requestMeetups).toEqual(requestMeetups);
    });

    it('should return meetups with "draft" status', () => {
      const draftMeetups = meetups.filter(
        (meetup) => meetup.status === 'DRAFT',
      );

      expect(meetupsStore.draftMeetups).toEqual(draftMeetups);
    });

    it('should return future meetups with "confirmed" status', () => {
      const futureMeetups = meetups.filter(
        (meetup) =>
          meetup.status === 'CONFIRMED' && new Date(meetup.start) > new Date(),
      );

      expect(meetupsStore.futureMeetups).toEqual(futureMeetups);
    });

    it('should return past meetups with "confirmed" status', () => {
      const pastMeetups = meetups.filter(
        (meetup) =>
          meetup.status === 'CONFIRMED' && new Date(meetup.start) < new Date(),
      );

      expect(meetupsStore.pastMeetups).toEqual(pastMeetups);
    });
  });
});
