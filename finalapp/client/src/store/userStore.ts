import { makeAutoObservable } from "mobx"
import { User } from "../core/types/User"
import { AuthorizationRequestData } from "../core/types/AuthorizationRequestData"
import ServerApi from "../core/utils/serverApi"

class UserStore {
  user: User = null!
  
  constructor(private readonly serverApi: ServerApi) {
    makeAutoObservable(this)
  }

  async singIn(user: AuthorizationRequestData): Promise<void> {
    const recievedUser = await this.serverApi.tryAuthorize(user)

    if(recievedUser !== null) {
      this.setUser(recievedUser)
    }
  }

  async fetchUser(): Promise<void> {
    const recievedUser = await this.serverApi.getUserFromServer()

    if(recievedUser !== null) {
      this.setUser(recievedUser)
    }
  }

  setUser(user: User) {
    this.user = user
  }
}

export default UserStore