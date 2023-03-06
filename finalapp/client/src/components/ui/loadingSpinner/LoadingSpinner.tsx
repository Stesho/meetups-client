import classNames from 'classnames';
import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  loaderClassName?: string
  spinnerClassName?: string
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const loaderClass = classNames(styles.spinnerWrapper, props.loaderClassName);
  const spinnerClass = classNames(styles.spinner, props.spinnerClassName);

  return (
    <div className={loaderClass}>
      <div className={spinnerClass} />
    </div>
  );
};

export default LoadingSpinner;