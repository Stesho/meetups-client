import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/Logo_SaM.svg';
import Navigation from './navigation/Navigation';
import BurgerMenu from './burgerMenu/BurgerMenu';

export const Header = (): JSX.Element => {
  const [isBurger, setIsBurger] = React.useState<boolean>(false);

  const checkIsBurger = () => {
    const pageWidth = document.documentElement.scrollWidth;
    if(pageWidth <= 768) {
      setIsBurger(true);
    }
    else {
      setIsBurger(false);
    }
  }

  React.useEffect(() => {
    checkIsBurger();
    window.addEventListener("resize", checkIsBurger);
    return () => {
      window.removeEventListener("resize", checkIsBurger);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <img className={styles.logo} src={logo} alt="SaM Solutions logo" />
        {isBurger ? <BurgerMenu /> : <Navigation />}
      </div>
    </header>
  );
};
