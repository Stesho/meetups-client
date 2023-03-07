import React, { useEffect } from 'react';
import styles from './MeetupsPage.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/storeContext';
import AvailableFor from '../../components/availableFor/AvailableFor';
import { Outlet, NavLink } from 'react-router-dom';
import TranslatedMessage from '../../components/translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';
import Loader from '../../components/ui/loader/Loader';
import classNames from 'classnames';

const MeetupsPage = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');
  const userStore = useStore('UserStore');
  const tabListClass = classNames(styles.tabList, userStore.user ? styles.fourTabs : styles.threeTabs)
  const setActiveLink = (props: {
    isActive: boolean;
    isPending: boolean;
  }): string | undefined =>
    props.isActive
      ? `${styles.tabItem} ${styles.selectedTabItem}`
      : `${styles.tabItem}`;
  
  const fetchMeetups = (): Promise<void> => {
    return new Promise(async (resolve) => {
      await meetupsStore.fetchMeetups();
      resolve();
    });
  }

  return (
    <section className="container smoothPage">
      <div className={styles.meetupsPage}>
        <h1 className="basicH1">
          <TranslatedMessage
            message={Translation.translatedText('meetups.title')}
          />
        </h1>

        <div className={styles.tabs}>
          <div className={tabListClass}>
            <div>
              <NavLink to="/meetups/topics" className={setActiveLink}>
                <TranslatedMessage
                  message={Translation.translatedText('meetups.tab.topics')}
                />
              </NavLink>
              <AvailableFor roles={['CHIEF', 'EMPLOYEE']}>
                <NavLink to="/meetups/moderation" className={setActiveLink}>
                  <TranslatedMessage
                    message={Translation.translatedText('meetups.tab.moderation')}
                  />
                </NavLink>
              </AvailableFor>
            </div>
            <div>
              <NavLink to="/meetups/future" className={setActiveLink}>
                <TranslatedMessage
                  message={Translation.translatedText('meetups.tab.future')}
                />
              </NavLink>
              <NavLink to="/meetups/past" className={setActiveLink}>
                <TranslatedMessage
                  message={Translation.translatedText('meetups.tab.past')}
                />
              </NavLink>
            </div>
          </div>
        </div>
        <Loader promise={fetchMeetups()}>
          <Outlet />
        </Loader>
      </div>
    </section>
  );
});

export default MeetupsPage;
