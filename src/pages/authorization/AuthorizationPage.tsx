import React from 'react';
import { AuthorizationForm } from '../../components/forms/authorization/AuthorizationForm';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthorizationRequestData } from '../../core/types/AuthorizationRequestData';
import styles from './AuthorizationPage.module.scss';
import { useStore } from '../../context/storeContext';
import TranslatedMessage from '../../components/translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';

export const AuthorizationPage = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const userStore = useStore('UserStore');

  const onAuthorizationFormSend = async (
    data: AuthorizationRequestData,
  ): Promise<void> => {
    await userStore.singIn(data);
    if(userStore.role) {
      navigate('/meetups');
    }
  };

  return (
    <section className="container smoothPage">
      <div id='authorizationPage' className={styles.authorizationPage}>
        <h1 className={`basicH1 ${styles.title}`}>
          <TranslatedMessage
            message={Translation.translatedText('auth.title')}
          />
        </h1>
        <p className={`paragraph ${styles.description}`}>
          <TranslatedMessage
            message={Translation.translatedText('auth.caption')}
          />
        </p>
        <AuthorizationForm onSubmit={onAuthorizationFormSend} />
      </div>
    </section>
  );
};
