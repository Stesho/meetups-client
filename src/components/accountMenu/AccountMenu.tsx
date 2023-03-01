import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import Button from '../ui/button/Button';
import Translation from '../../core/utils/translation';
import TranslatedMessage from '../translatedMessage/TranslatedMessage';
import useOutsideClick from '../../core/hooks/useOutsideClick';
import { useStore } from '../../context/storeContext';
import classNames from 'classnames';
import styles from './AccountMenu.module.scss';

interface AccountMenuProps {
  children: JSX.Element,
  className?: string
} 

const AccountMenu = (props: AccountMenuProps): JSX.Element | null => {
  const userStore = useStore('UserStore');
  const navigate: NavigateFunction = useNavigate();
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const dropDownMenu = useOutsideClick(() => setIsActive(false));
  
  const dropDownMenuClass = classNames(styles.dropDownMenu, props.className);

  const onLogout = async () => {
    await userStore.logout();
    navigate('/meetups');
  }

  const toggleMenu = () => {
    setIsActive((current) => !current);
  }

  return (
    <div ref={dropDownMenu} className={styles.accountMenu}>
      <div className={styles.accountBtn} onClick={toggleMenu}>
        {props.children}
      </div>
      {isActive && (
        <div className={dropDownMenuClass}>
          <Button type='secondary' callback={onLogout}>
            <TranslatedMessage message={Translation.translatedText('btn.logout')}/>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;