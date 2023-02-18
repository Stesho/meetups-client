import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { StoreProvider } from './context/storeContext';
import LocaleProvider from './context/localeProvider';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </StoreProvider>
  </React.StrictMode>,
);
