import { makeAutoObservable } from 'mobx';
import { User } from '../../core/types/User';
import { AuthorizationRequestData } from '../../core/types/AuthorizationRequestData';
import IServerApi from '../../core/types/IServerApi';

type Roles = 'EMPLOYEE' | 'CHIEF';

class UserStore {
  user: User = null!;

  constructor(private readonly serverApi: IServerApi) {
    makeAutoObservable(this);
  }

  async singIn(user: AuthorizationRequestData): Promise<void> {
    const recievedUser = await this.serverApi.tryAuthorize(user);

    if (recievedUser !== null) {
      this.user = recievedUser;
    }
  }

  async fetchUser(): Promise<void> {
    const recievedUser = await this.serverApi.getUserFromServer();

    if (recievedUser !== null) {
      this.user = recievedUser;
    }
  }

  get role(): Roles | null {
    return this.user?.roles;
  }
}

export default UserStore;
