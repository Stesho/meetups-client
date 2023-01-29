import { createStoreContext } from '../core/utils/createContext'
import MeetupsStore from '../store/meetupsStore'
import UserStore from '../store/userStore'

const meetupsStore = new MeetupsStore()
const userStore = new UserStore()

const { StoreProvider, useStore } = createStoreContext({
  MeetupsStore: meetupsStore,
  UserStore: userStore
})

export { StoreProvider, useStore }