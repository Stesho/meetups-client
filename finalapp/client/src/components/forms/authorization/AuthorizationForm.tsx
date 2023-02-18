import styles from './AuthorizationForm.module.scss';
import React, { useState } from 'react';
import Button from '../../ui/button/Button';
import { LabeledInput } from '../../ui/labeledInput/LabeledInput';
import { AuthorizationRequestData } from '../../../core/types/AuthorizationRequestData';
import { useInput } from '../../../core/hooks/useInput';
import {
  checkMinLength,
  checkMaxLength,
} from '../../../core/utils/inputValidation';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

interface AuthorizationFormProps {
  onSubmit: (data: AuthorizationRequestData) => void;
}

const minInputLength = 1;
const maxInputLength = 100;

const validationOptions = {
  minLength: checkMinLength(minInputLength),
  maxLength: checkMaxLength(maxInputLength),
};

export const AuthorizationForm = (
  props: AuthorizationFormProps,
): JSX.Element => {
  const errorMessages = {
    minLength: Translation.translatedText('validation.notEmpty'),
    maxLength: Translation.translatedText('validation.maxLength'),
  };

  const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const username = useInput<typeof validationOptions>(
    validationOptions,
    errorMessages,
  );
  const password = useInput<typeof validationOptions>(
    validationOptions,
    errorMessages,
  );

  const onAuthorizeButtonClick = (): void =>
    props.onSubmit({
      username: username.value,
      password: password.value,
    });

  const checkForm = (): boolean =>
    [username, password].every((input) => input.isValid);

  return (
    <form className={styles.form} onSubmit={preventDefaultSubmit} action="#">
      <LabeledInput
        onChange={username.setValue}
        onBlur={() => username.setIsOnBlur(true)}
        type="text"
        label={Translation.translatedText('form.userName')}
        placeholder="Albert Richards"
        className={styles.input}
        status={username.status}
        helpText={username.message}
      />
      <LabeledInput
        onChange={password.setValue}
        onBlur={() => password.setIsOnBlur(true)}
        type="password"
        label={Translation.translatedText('form.password')}
        className={styles.input}
        status={password.status}
        helpText={password.message}
      />
      <Button
        type="primary"
        callback={onAuthorizeButtonClick}
        disabled={!checkForm()}
        className={styles.button}
      >
        <TranslatedMessage message={Translation.translatedText('btn.signIn')} />
      </Button>
    </form>
  );
};
