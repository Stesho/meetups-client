import React from 'react';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react-lite';
import ErrorIcon from '../../assets/icons/help-text-invalid.svg';
import SuccessIcon from '../../assets/icons/help-text-success.svg';
import CrossIcon from '../../assets/icons/cross-icon.svg';
import styles from './NotificationBanner.module.scss';
import { NotificationType } from '../../store/notificationStore';
import Translation from '../../core/utils/translation';
import TranslatedMessage from '../translatedMessage/TranslatedMessage';

type NotificationParams = {
  style: string;
  img: string;
  title: Translation;
};

type NotificationTypes = {
  [K in NotificationType]: NotificationParams;
};

const notificationType: NotificationTypes = {
  error: {
    style: styles.error,
    img: ErrorIcon,
    title: Translation.translatedText('notification.error.title'),
  },
  success: {
    style: styles.success,
    img: SuccessIcon,
    title: Translation.translatedText('notification.success.title'),
  },
  // set warning params
  warning: {
    style: styles.success,
    img: SuccessIcon,
    title: Translation.translatedText('notification.warning.title'),
  },
  // set help params
  help: {
    style: styles.success,
    img: SuccessIcon,
    title: Translation.translatedText('notification.help.title'),
  },
};

const NotificationBanner = observer((): JSX.Element => {
  const notificationStore = useStore('NotificationStore');
  const type = notificationStore.type;

  const style = notificationType[type].style;
  const img = notificationType[type].img;
  const title = notificationType[type].title;

  const onClose = () => {
    notificationStore.close();
  };

  return (
    <div>
      {notificationStore.isActive && (
        <div id='notification' data-testid='notification' className={style}>
          <img className={styles.img} src={img} alt="banner type" />
          <div className={styles.text}>
            <span className={styles.title}>
              <TranslatedMessage message={title} />
            </span>
            <p className={styles.message}>
              <TranslatedMessage message={notificationStore.message} />
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={CrossIcon} alt="close" />
          </button>
        </div>
      )}
    </div>
  );
});

export default NotificationBanner;
