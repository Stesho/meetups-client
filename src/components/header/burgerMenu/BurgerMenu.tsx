import React from 'react';
import { NavLink } from 'react-router-dom';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import styles from './BurgerMenu.module.scss';
import { useStore } from '../../../context/storeContext';
import { ProfileInfo } from '../../profile/profileInfo/ProfileInfo';
import LangSwitcher from '../../ui/langSwitcher/LangSwitcher';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const BurgerMenu = () => {
  const userStore = useStore('UserStore');
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const burgerBtnClass = classNames(styles.burgerBtn, {
    [styles.cross]: isOpen 
  })

  const disableScrolling = () => {
    document.body.classList.add("stopScrolling");
  }

  const enableScrolling = () => {
    document.body.classList.remove("stopScrolling");
  }

  const toggleMenu = () => setIsOpen(current => !current);

  const logout = async () => {
    await userStore.logout();
    setIsOpen(false);
  }

  const toAuthorizePage = () => {
    navigate('/authorize');
    setIsOpen(false);
  }

  React.useEffect(() => {
    isOpen ? disableScrolling() : enableScrolling();
  }, [isOpen]);

  return (
    <div className={styles.burgerMenu}>
      <button className={burgerBtnClass} onClick={toggleMenu}>
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
                  text={{ fontWeight: '400', fontSize: '16px', color: '#5b6887' }}
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
              <div className={styles.navItem} onClick={logout}>
                <TranslatedMessage
                  message={Translation.translatedText('btn.logout')}
                />
              </div>
            ) : (
              <div className={styles.navItem} onClick={toAuthorizePage}>
                <TranslatedMessage
                  message={Translation.translatedText('btn.signIn')}
                />
              </div>
            )
            }
          </nav>
        </div>
      )}
    </div> 
  );
};

export default BurgerMenu;