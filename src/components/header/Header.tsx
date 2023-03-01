import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/Logo_SaM.svg';
import Button from '../ui/button/Button';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ProfileInfo } from '../profileInfo/ProfileInfo';
import { ShortUser } from '../../core/types/User';
import { observer } from 'mobx-react-lite';
import TranslatedMessage from '../translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';
import AccountMenu from '../accountMenu/AccountMenu';
import LangSwitcher from '../ui/langSwitcher/LangSwitcher';

export interface HeaderProps {
  user: ShortUser | null;
}

export const Header = observer(({ user }: HeaderProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const toAuthorizePage = () => {
    navigate('/authorize');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <img className={styles.logo} src={logo} alt="SaM Solutions logo" />
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
          {user !== null ? (
            <AccountMenu className={styles.accountMenu}>
              <ProfileInfo
                user={user}
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
      </div>
    </header>
  );
});
