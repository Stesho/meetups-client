import React, { useEffect } from 'react';
import styles from './MeetupsPage.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/storeContext';
import AvailableFor from '../../core/utils/availableFor';
import { Outlet, NavLink } from 'react-router-dom';

const MeetupsPage = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');
  const setActiveLink = (props: {
    isActive: boolean;
    isPending: boolean;
  }): string | undefined =>
    props.isActive
      ? `${styles.tabItem} ${styles.selectedTabItem}`
      : `${styles.tabItem}`;

  useEffect((): void => {
    meetupsStore.fetchMeetups();
  }, []);

  return (
    <section className="container smoothPage">
      <div className={styles.meetupsPage}>
        <h1 className="basicH1">Митапы</h1>

        <div className={styles.tabs}>
          <div className={styles.tabList}>
            <NavLink to="/meetups/topics" className={setActiveLink}>
              Темы
            </NavLink>
            <AvailableFor roles={['CHIEF', 'EMPLOYEE']}>
              <NavLink to="/meetups/moderation" className={setActiveLink}>
                На модерации
              </NavLink>
            </AvailableFor>
            <NavLink to="/meetups/future" className={setActiveLink}>
              Будущие
            </NavLink>
            <NavLink to="/meetups/past" className={setActiveLink}>
              Прошедшие
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </section>
  );
});

export default MeetupsPage;
