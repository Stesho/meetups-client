import React from 'react';
import styles from './RedactorButton.module.scss';
import editIcon from '../../../assets/icons/edit-icon.svg';
import deleteIcon from '../../../assets/icons/delete-icon.svg';

export interface RedactorButtonProps {
  type: 'delete' | 'edit';
  onClick: () => void;
  style?: React.CSSProperties;
}

export const RedactorButton = ({
  type,
  onClick,
  style,
}: RedactorButtonProps): JSX.Element => {
  return (
    <button className={styles.button} style={style} onClick={onClick}>
      {type === 'delete' ? (
        <img src={deleteIcon} alt="Remove" />
      ) : (
        <img src={editIcon} alt="Edit" />
      )}
    </button>
  );
};
