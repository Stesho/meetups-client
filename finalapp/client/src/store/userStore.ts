import { makeAutoObservable } from "mobx"
import { User } from "../core/types/User"
import { AuthorizationRequestData } from "../core/types/AuthorizationRequestData"
import { tryAuthorize } from "../core/utils/tryAuthorize"

class UserStore {
  user: User = null!
  
  constructor() {
    makeAutoObservable(this)
  }

  async singIn(user: AuthorizationRequestData): Promise<void> {
    const recievedUser = await tryAuthorize(user)

    if(recievedUser !== null) {
      this.setUser(recievedUser)
    }
  }

  setUser(user: User) {
    this.user = user
  }
}

export default UserStore