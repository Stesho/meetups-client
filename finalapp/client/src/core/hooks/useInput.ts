import { useState, useEffect } from 'react';
import Translation from '../utils/translation';

type Status = 'success' | 'invalid' | 'default';

type Options<T> = {
  [K in keyof T]: (value: string) => boolean;
};

type ErrorMessages<T> = {
  [K in keyof T]: Translation;
};

type SuccessMessage = Translation;

interface Input {
  value: string;
  isValid: boolean;
  status: Status;
  message: Translation;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIsOnBlur: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useInput = <T>(
  validationOptions: Options<T>,
  errorMessages?: Partial<ErrorMessages<T>>,
  successMessage?: SuccessMessage,
): Input => {
  type Option = keyof Options<T>;

  const [value, setValue] = useState<string>('');
  const [isOnBlur, setIsOnBlur] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>('default');
  const [message, setMessage] = useState<Translation>(Translation.empty);
  const [isValid, setIsValid] = useState<boolean>(false);

  const getSuccessMessage = (): Translation =>
    successMessage || Translation.empty;
  const getErrorMessage = (option: Option): Translation =>
    errorMessages
      ? errorMessages[option] || Translation.empty
      : Translation.empty;

  const getErrorOption = (
    validationOptions: Options<T>,
    value: string,
  ): Option | null => {
    for (const option in validationOptions) {
      if (!validationOptions[option](value)) {
        return option;
      }
    }
    return null;
  };

  const getInputStatus = (isOnBlur: boolean, isValid: boolean): Status => {
    if (isOnBlur) {
      return isValid ? 'success' : 'invalid';
    }
    return 'default';
  };

  const getInputMessage = (
    message: Translation,
    isOnBlur: boolean,
  ): Translation => (isOnBlur ? message : Translation.empty);

  const setInputState = () => {
    const errorOption = getErrorOption(validationOptions, value);
    const isValidInput = errorOption === null;
    const inputStatus = getInputStatus(isOnBlur, isValidInput);
    const message = isValidInput
      ? getSuccessMessage()
      : getErrorMessage(errorOption);
    const inputMessage = getInputMessage(message, isOnBlur);

    setIsValid(isValidInput);
    setStatus(inputStatus);
    setMessage(inputMessage);
  };

  useEffect(setInputState, [value, isOnBlur]);

  return {
    value,
    isValid,
    status,
    message,
    setValue,
    setIsOnBlur,
  };
};
