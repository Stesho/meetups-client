import { createStoreContext } from '../core/utils/createContext'
import MeetupsStore from '../store/meetupsStore'
import UserStore from '../store/userStore'
import NewsStore from '../store/newsStore'
import NotificationStore from '../store/notificationStore'
import ServerApi from '../core/utils/serverApi'

const notificationStore = new NotificationStore()
const serverApi = new ServerApi(notificationStore)
const meetupsStore = new MeetupsStore(serverApi)
const userStore = new UserStore(serverApi)
const newsStore = new NewsStore(serverApi)

const { StoreProvider, useStore } = createStoreContext({
  MeetupsStore: meetupsStore,
  UserStore: userStore,
  NewsStore: newsStore,
  NotificationStore: notificationStore
})

export { StoreProvider, useStore }