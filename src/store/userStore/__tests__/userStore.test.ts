import mockServerApi from '../../../mocks/mockServerApi';
import UserStore from '../userStore';
import { AuthorizationRequestData } from '../../../core/types/AuthorizationRequestData';
import users from './users.json';

describe('userStore', () => {
  let userStore: UserStore;

  beforeEach(() => {
    userStore = new UserStore(mockServerApi);
  });

  describe('authorization', () => {
    beforeEach(() => {
      mockServerApi.tryAuthorize.mockImplementation(
        (authData: AuthorizationRequestData) => {
          const user = users.find(
            (user) =>
              user.name === authData.username &&
              user.password === authData.password,
          );

          return user || null;
        },
      );
    });

    it('should set user', async () => {
      const validUser = {
        username: 'employee',
        password: 'private',
      };
      await userStore.singIn(validUser);

      expect(userStore.user).toEqual(users[0]);
      expect(mockServerApi.tryAuthorize).toHaveBeenCalledTimes(1);
    });

    it('should return null if user is not found', async () => {
      const validUser = {
        username: 'employee',
        password: 'private',
      };
      await userStore.singIn(validUser);

      expect(userStore.user).toEqual(users[0]);
      expect(mockServerApi.tryAuthorize).toHaveBeenCalledTimes(1);
    });
  });
});
