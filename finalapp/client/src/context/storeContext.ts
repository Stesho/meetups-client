import { createStoreContext } from '../core/utils/createContext';
import MeetupsStore from '../store/meetupsStore';
import UserStore from '../store/userStore';
import NewsStore from '../store/newsStore';
import NotificationStore from '../store/notificationStore';
import ServerApi from '../core/utils/serverApi';
import ConfirmationStore from '../store/confirmationStore';
import LocaleStore from '../store/localeStore';

const localeStore = new LocaleStore();
const notificationStore = new NotificationStore();
const confirmationStore = new ConfirmationStore();
const serverApi = new ServerApi(notificationStore);

const meetupsStore = new MeetupsStore(serverApi, confirmationStore);
const userStore = new UserStore(serverApi);
const newsStore = new NewsStore(serverApi);

const { StoreProvider, useStore } = createStoreContext({
  LocaleStore: localeStore,
  MeetupsStore: meetupsStore,
  UserStore: userStore,
  NewsStore: newsStore,
  NotificationStore: notificationStore,
  ConfirmationStore: confirmationStore,
});

export { StoreProvider, useStore };
