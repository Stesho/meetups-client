import React from 'react';
import TranslatedMessage from '../../components/translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';
import Button from '../../components/ui/button/Button';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const toMeetupsPage = () => {
    navigate('/meetups');
  }

  return (
    <section className="container smoothPage">
      <div className={styles.notFound}>
        <h2 className={styles.title}>
          <TranslatedMessage
            message={Translation.translatedText('notFound.title')}
          />
        </h2>
        <p className={styles.text}>
          <TranslatedMessage
            message={Translation.translatedText('notFound.text')}
          />
        </p>
        <div className={styles.toHomeBtnWrapper}>
          <Button type="primary" callback={toMeetupsPage} >
            <TranslatedMessage
              message={Translation.translatedText('btn.toHome')}
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;