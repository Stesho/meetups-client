import { makeAutoObservable } from 'mobx';
import English from '../i18n/en-US.json';
import Russian from '../i18n/ru-RU.json';

class LocaleStore {
  locale = '';

  constructor() {
    makeAutoObservable(this);
    let locale = localStorage.getItem('language');
    
    if(locale === null) {
      locale = navigator.language;
    }

    this.setLocale(locale);
  }

  setLocale(locale: string) {
    this.locale = locale;
    localStorage.setItem('language', locale);
  }

  get language() {
    if (this.locale === 'ru') {
      return Russian;
    }
    if (this.locale === 'en') {
      return English;
    }
    return Russian;
  }
}

export default LocaleStore;
