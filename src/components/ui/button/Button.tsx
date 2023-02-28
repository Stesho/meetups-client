import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary' | 'default';
  id?: string
  className?: string;
  disabled?: boolean;
  callback: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  id,
  children,
  type,
  disabled,
  callback,
  className,
}: ButtonProps) {
  const buttonClass = classNames(styles.button, styles[type], className);

  return (
    <button
      id={id}
      onClick={(event) => callback(event)}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
