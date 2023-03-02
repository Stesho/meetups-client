import classNames from 'classnames';
import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  spinnerClassName?: string;
  dotClassName?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const spinnerClass = classNames(styles.spinner, props.spinnerClassName);
  const dotClass = classNames(styles.dot, props.dotClassName);

  return (
    <div className={spinnerClass}>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
      <div className={styles.dotWrapper}><div className={dotClass} /></div>
    </div>
  );
};

export default LoadingSpinner;