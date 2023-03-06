import React from 'react';
import { NavLink } from 'react-router-dom';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import styles from './BurgerMenu.module.scss';
import { useStore } from '../../../context/storeContext';
import { ProfileInfo } from '../../profile/profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import LangSwitcher from '../../ui/langSwitcher/LangSwitcher';

const BurgerMenu = () => {
  const userStore = useStore('UserStore');
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(current => !current);

  return (
    <div className={styles.burgerMenu}>
      <button className={styles.burgerBtn} onClick={toggleMenu}>
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} />
      </button>
      {isOpen && (
        <div className={styles.overlay}>
          <nav className={styles.menu}>
            {userStore.user && (
              <div className={styles.profile}>
                <LangSwitcher
                  switcherClassName={styles.langSwitcher}
                  listClassName={styles.langList}
                />
                <ProfileInfo
                  user={userStore.user}
                  first="name"
                  avatarHeightPX={40}
                  text={{ fontWeight: '400', fontSize: '16px', color: '#FFF' }}
                />
              </div>
            )}
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
            {userStore.user
            ? (
              <div className={styles.navItem}>
                <TranslatedMessage
                  message={Translation.translatedText('btn.logout')}
                />
              </div>
            ) : (
              <Button type='secondary' callback={() => {}} className={styles.navItem}>
                <TranslatedMessage
                  message={Translation.translatedText('btn.signIn')}
                />
              </Button>
            )
            }
          </nav>
        </div>
      )}
    </div> 
  );
};

export default BurgerMenu;