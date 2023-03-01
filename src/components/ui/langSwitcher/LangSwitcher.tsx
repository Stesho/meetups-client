import React from 'react';
import translatorIcon from '../../../assets/icons/translator-icon.svg';
import { useStore } from '../../../context/storeContext';
import classNames from 'classnames';
import useOutsideClick from '../../../core/hooks/useOutsideClick';
import styles from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  switcherClassName?: string
  listClassName?: string
}

const LangSwitcher = (props: LangSwitcherProps) => {
  const localeStore = useStore('LocaleStore');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const switcher = useOutsideClick(() => setIsOpen(false));

  const switcherClass = classNames(styles.langSwitcher, props.switcherClassName); 
  const listClass = classNames(styles.langList, props.listClassName); 

  const selectLanguage = (locale: string) => {
    localeStore.setLocale(locale);
    setIsOpen(false);
  };

  return (
    <div ref={switcher} className={switcherClass}>
      <div className={styles.langBtn} onClick={() => setIsOpen(!isOpen)}>
        <img src={translatorIcon} className={styles.langIcon} alt="translate app" />
      </div>
      {isOpen && (
        <div className={listClass}>
          <input className={styles.lang} id="ru"/>
          <label className={styles.firstItem} htmlFor="ru"  onClick={() => selectLanguage('ru')}>Русский</label>
          <input className={styles.lang} id="en" />
          <label className={styles.lastItem} htmlFor="en" onClick={() => selectLanguage('en')}>English</label>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;