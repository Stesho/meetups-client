import React from 'react';
import styles from './RequiredCreateForm.module.scss';
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../../ui/textArea/TextArea';
import { useInput } from '../../../../core/hooks/useInput';
import {
  checkMinLength,
  checkMaxLength,
} from '../../../../core/utils/inputValidation';
import Button from '../../../ui/button/Button';

export interface FormRequiredData {
  name: string;
  speaker: string;
  description: string;
}

interface RequiredCreateFormProps {
  onSubmit: (
    data: FormRequiredData,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onCancel: () => void;
}

const minInputLength = 1;
const maxInputLength = 100;
const maxTextAreaLength = 500;

const validationOptions = {
  minLength: checkMinLength(minInputLength),
  maxLength: checkMaxLength(maxInputLength),
};

const errorMessages = {
  minLength: 'Поле не может быть пустым',
  maxLength: 'Поле слишком длинное',
};

export const RequiredCreateForm = (
  props: RequiredCreateFormProps,
): JSX.Element => {
  const name = useInput<typeof validationOptions>(
    validationOptions,
    errorMessages,
  );
  const speaker = useInput<typeof validationOptions>(
    validationOptions,
    errorMessages,
  );
  const description = useInput<typeof validationOptions>(
    {
      ...validationOptions,
      maxLength: checkMaxLength(maxTextAreaLength),
    },
    errorMessages,
  );

  const checkForm = (): boolean =>
    [name, speaker, description].every((input) => input.isValid);

  const getData = () => {
    return {
      name: name.value,
      speaker: speaker.value,
      description: description.value,
    };
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <LabeledInput
          onChange={name.setValue}
          onBlur={() => name.setIsOnBlur(true)}
          status={name.status}
          type="text"
          label="Название"
          helpText={name.message}
        />
        <LabeledInput
          onChange={speaker.setValue}
          onBlur={() => speaker.setIsOnBlur(true)}
          status={speaker.status}
          type="text"
          label="Спикер"
          helpText={speaker.message}
        />
        <TextArea
          onChange={(event) => description.setValue(event.target.value)}
          onBlur={() => description.setIsOnBlur(true)}
          status={description.status}
          name="Описание"
          maxLength={maxTextAreaLength}
          helpText={description.message}
        />
      </div>
      <div className={styles.buttons}>
        <Button callback={props.onCancel} type="default">Назад</Button>
        <Button
          callback={(event) => props.onSubmit(getData(), event)}
          type="primary"
          disabled={!checkForm()}
        >
          Далее
        </Button>
      </div>
    </form>
  );
};
