import IServerApi from '../core/types/IServerApi';

type MockedServerApi = Record<keyof IServerApi, jest.Mock<any, any>>;

const mockServerApi: MockedServerApi = {
  getMeetupsFromServer: jest.fn(),
  updateMeetupOnServer: jest.fn(),
  removeMeetupFromServerById: jest.fn(),
  sendCreatedMeetupToServer: jest.fn(),
  getMeetupFromServerById: jest.fn(),
  getVotedUsers: jest.fn(),
  sendVotedUser: jest.fn(),
  removeVotedUser: jest.fn(),
  getParticipants: jest.fn(),
  sendParticipant: jest.fn(),
  removeParticipant: jest.fn(),
  tryAuthorize: jest.fn(),
  getUserFromServer: jest.fn(),
  logout: jest.fn(),
  getNewsFromServer: jest.fn(),
  sendCreatedNewsToServer: jest.fn(),
  getNewsFromServerById: jest.fn(),
};

export default mockServerApi;
