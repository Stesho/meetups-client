import React, { useRef } from 'react';
import classNames from 'classnames';
import CrossIcon from '../../assets/icons/cross-icon.svg';
import styles from './Confirmation.module.scss';
import Button from '../ui/button/Button';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react-lite';

const Modal = observer((): JSX.Element => {
  const overlay = useRef<HTMLDivElement>(null);
  const confirmationStore = useStore('ConfirmationStore');

  const onClickOutside = (target: EventTarget) => {
    if (target === overlay.current) {
      confirmationStore.close();
    }
  };

  const close = () => {
    confirmationStore.close();
  };

  const confirm = () => {
    confirmationStore.onConfirm();
    confirmationStore.close();
  };

  const overlayClass = classNames(styles.overlay, {
    [styles.close]: !confirmationStore.isActive,
  });

  return (
    <div
      ref={overlay}
      className={overlayClass}
      onClick={(event) => onClickOutside(event.target)}
    >
      <div className={styles.window}>
        <button className={styles.closeBtn} onClick={close}>
          <img src={CrossIcon} alt="cross" />
        </button>
        <span className={styles.title}>{confirmationStore.title}</span>
        <span className={styles.text}>{confirmationStore.text}</span>
        <div className={styles.buttons}>
          <Button
            callback={close}
            type="secondary"
            className={styles.cancelBtn}
          >
            Нет
          </Button>
          <Button
            callback={confirm}
            type="primary"
            className={styles.confirmBtn}
          >
            Да
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Modal;
