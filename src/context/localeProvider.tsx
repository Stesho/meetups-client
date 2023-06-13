import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from './storeContext';
import { IntlProvider } from 'react-intl';

interface LocaleProviderProps {
  children: React.ReactNode;
}

const LocaleProvider = observer((props: LocaleProviderProps): JSX.Element => {
  const localeStore = useStore('LocaleStore');

  return (
    <IntlProvider
      messages={localeStore.language}
      locale={localeStore.locale}
      defaultLocale="ru-RU"
    >
      {props.children}
    </IntlProvider>
  );
});

export default LocaleProvider;
