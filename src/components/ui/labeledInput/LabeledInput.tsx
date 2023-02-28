import React from 'react';
import { Input, InputProps } from '../input/Input';
import styles from './LabeledInput.module.scss';
import classNames from 'classnames';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

interface LabeledInputProps extends InputProps {
  label: Translation;
  helpText?: Translation;
}

export const LabeledInput = (props: LabeledInputProps): JSX.Element => {
  const additionalTextClass: string = classNames(styles.text, {
    [styles.invalid]: props.status === 'invalid',
    [styles.success]: props.status === 'success',
  });

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        <TranslatedMessage message={props.label} />
      </label>

      <Input
        onClick={props.onClick}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        status={props.status}
        disabled={props.disabled}
        type={props.type}
        initialValue={props.initialValue}
        className={props.className}
        readonly={props.readonly}
        value={props.value}
      />

      {props.helpText?.id && (
        <span className={additionalTextClass}>
          <TranslatedMessage message={props.helpText} />
        </span>
      )}
    </div>
  );
};
