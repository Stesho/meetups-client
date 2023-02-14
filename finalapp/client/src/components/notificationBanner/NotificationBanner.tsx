import React from 'react';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react-lite';
import ErrorIcon from '../../assets/icons/help-text-invalid.svg';
import SuccessIcon from '../../assets/icons/help-text-success.svg';
import CrossIcon from '../../assets/icons/cross-icon.svg';
import styles from './NotificationBanner.module.scss';
import { NotificationType } from '../../store/notificationStore';

type NotificationParams = {
  style: string;
  img: string;
  title: string;
};

type NotificationTypes = {
  [K in NotificationType]: NotificationParams;
};

const notificationType: NotificationTypes = {
  error: {
    style: styles.error,
    img: ErrorIcon,
    title: 'Ошибка',
  },
  success: {
    style: styles.success,
    img: SuccessIcon,
    title: 'Отлично',
  },
  // set warning params
  warning: {
    style: styles.success,
    img: SuccessIcon,
    title: 'Отлично',
  },
  // set help params
  help: {
    style: styles.success,
    img: SuccessIcon,
    title: 'Отлично',
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
        <div className={style}>
          <img className={styles.img} src={img} alt="banner type" />
          <div className={styles.text}>
            <span className={styles.title}>{title}</span>
            <p className={styles.message}>{notificationStore.message}</p>
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
