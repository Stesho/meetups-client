import { createStoreContext } from '../core/utils/createContext'
import MeetupsStore from '../store/meetupsStore'
import UserStore from '../store/userStore'
import NewsStore from '../store/newsStore'

const meetupsStore = new MeetupsStore()
const userStore = new UserStore()
const newsStore = new NewsStore()

const { StoreProvider, useStore } = createStoreContext({
  MeetupsStore: meetupsStore,
  UserStore: userStore,
  NewsStore: newsStore
})

export { StoreProvider, useStore }