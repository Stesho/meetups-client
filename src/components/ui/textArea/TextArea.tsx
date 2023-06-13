import React, { useState } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';
import Translation from '../../../core/utils/translation';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';

export interface TextAreaProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  name?: Translation;
  maxLength?: number;
  helpText?: Translation;
  status?: 'success' | 'invalid' | 'default';
  initialValue?: string;
  className?: string;
}

export const TextArea = ({
  name,
  maxLength,
  onChange,
  onBlur,
  helpText,
  status,
  className,
  initialValue,
}: TextAreaProps): JSX.Element => {
  const [inputText, setInputText] = useState(initialValue || '');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value.slice(0, maxLength));
    onChange(event);
  };

  const textAreaClass: string = classNames(styles.textArea, className, {
    [styles.invalid]: status === 'invalid',
    [styles.success]: status === 'success',
  });

  const additionalTextClass: string = classNames(styles.text, {
    [styles.invalid]: status === 'invalid',
    [styles.success]: status === 'success',
  });

  return (
    <div className={styles.textAreaContainer}>
      <div className={styles.info}>
        <span className={styles.inputName}>
          <TranslatedMessage message={name || Translation.empty} />
        </span>
        {maxLength && (
          <div>
            <span className={styles.inputCount}>{inputText.length}</span>
            <span className={styles.inputMax}>/{maxLength}</span>
          </div>
        )}
      </div>
      <textarea
        value={inputText}
        className={textAreaClass}
        onChange={handleTextChange}
        onBlur={onBlur}
      />
      {helpText && (
        <span className={additionalTextClass}>
          <TranslatedMessage message={helpText} />
        </span>
      )}
    </div>
  );
};
