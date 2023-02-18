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
import { useStore } from '../../context/storeContext';
import Translation from '../../core/utils/translation';

export interface HeaderProps {
  user: ShortUser;
}

export const Header = observer(({ user }: HeaderProps): JSX.Element => {
  const localeStore = useStore('LocaleStore');
  const navigate: NavigateFunction = useNavigate();

  const toAuthorizePage = () => {
    navigate('/authorize');
  };

  const selectLanguage = (locale: string) => {
    localeStore.setLocale(locale);
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
        <div>
          <select
            name=""
            id=""
            value={localeStore.locale}
            onChange={(event) => selectLanguage(event.target.value)}
          >
            <option value="ru">ru</option>
            <option value="en">en</option>
          </select>
          {user !== null ? (
            <ProfileInfo
              user={user}
              first="name"
              avatarHeightPX={40}
              text={{ fontWeight: '400', fontSize: '16px', color: '#FFF' }}
            />
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
