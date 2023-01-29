import React, { useRef } from 'react';
import classNames from 'classnames';
import CrossIcon from '../../assets/icons/cross-icon.svg'
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode,
  isActive: boolean,
  onClose: () => void
}

const Modal = (props: ModalProps): JSX.Element => {
  const overlay = useRef<HTMLDivElement>(null);

  const onClickOutside = (target: EventTarget) => {
    if(target === overlay.current) {
      props.onClose()
    }
  }

  const overlayClass = classNames(
    styles.overlay, 
    {
      [styles.close]: !props.isActive
    }
  )
  
  return (
    <div ref={overlay} className={overlayClass} onClick={(event) => onClickOutside(event.target)}>
      <div className={styles.modal}>
        <button className={styles.modal__close} onClick={() => props.onClose()}>
          <img src={CrossIcon} alt="cross" />
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;