import React from 'react';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import { NavLink } from 'react-router-dom';
import LangSwitcher from '../../ui/langSwitcher/LangSwitcher';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../context/storeContext';
import AccountMenu from '../../accountMenu/AccountMenu';
import { ProfileInfo } from '../../profile/profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation = observer(() => {
  const userStore = useStore('UserStore');
  const navigate = useNavigate();

  const toAuthorizePage = () => {
    navigate('/authorize');
  };

  return (
    <>
      <nav className={styles.navigation}>
        <NavLink
          to="/meetups"
          className={(active) =>
            `${styles.navItem} ${active.isActive && styles.activeLink}`
          }
        >
          <TranslatedMessage
            message={Translation.translatedText('meetups.title')}
          />
        </NavLink>
        <NavLink
          to="/news"
          className={(active) =>
            `${styles.navItem} ${active.isActive && styles.activeLink}`
          }
        >
          <TranslatedMessage
            message={Translation.translatedText('news.title')}
          />
        </NavLink>
      </nav>
      <div className={styles.mainBar}>
        <LangSwitcher
          switcherClassName={styles.langSwitcher}
          listClassName={styles.langList}
        />
        {userStore.user !== null ? (
          <AccountMenu className={styles.accountMenu}>
            <ProfileInfo
              user={userStore.user}
              first="name"
              avatarHeightPX={40}
              text={{ fontWeight: '400', fontSize: '16px', color: '#FFF' }}
            />
          </AccountMenu>
        ) : (
          <Button callback={toAuthorizePage} type="default">
            <TranslatedMessage
              message={Translation.translatedText('btn.signIn')}
            />
          </Button>
        )}
      </div>
    </>
  );
});

export default Navigation;