import ServerApi from '../serverApi';
import NotificationStore from '../../../../store/notificationStore';
import meetups from './meetups.json';

const notificationStore = new NotificationStore();
const serverApi = new ServerApi(notificationStore);

// function getApiData(url: ) {

// }

// global.fetch = jest.fn((url, options) =>
//   Promise.resolve({
//     json: () => Promise.resolve({ test: 100 }),
//   }),
// ) as jest.Mock;

describe('asd', () => {
  // beforeEach(() => {
  //   fetch.resetMocks();
  // });  

  test('zxc', () => {
    // global.fetch = () => 'asd';    
    expect(5).toBe(5);
  });
});
