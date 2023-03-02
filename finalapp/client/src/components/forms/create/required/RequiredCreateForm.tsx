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
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';

export interface FormRequiredData {
  name: string;
  speaker: string;
  description: string;
}

interface RequiredCreateFormProps {
  initialValues?: FormRequiredData
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

const textAreaValidationOptions = {
  ...validationOptions,
  maxLength: checkMaxLength(maxTextAreaLength),
}

const errorMessages = {
  minLength: Translation.translatedText('validation.notEmpty'),
  maxLength: Translation.translatedText('validation.maxLength'),
};

export const RequiredCreateForm = (
  props: RequiredCreateFormProps,
): JSX.Element => {
  const name = useInput({
    initialValue: props.initialValues?.name,
    validationOptions,
    errorMessages,
  });
  const speaker = useInput({
    initialValue: props.initialValues?.speaker,
    validationOptions,
    errorMessages,
  });
  const description = useInput({
    initialValue: props.initialValues?.description,
    validationOptions: textAreaValidationOptions,
    errorMessages,
  });

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
          value={name.value}
          onChange={name.setValue}
          onBlur={() => name.setIsOnBlur(true)}
          status={name.status}
          type="text"
          label={Translation.translatedText('form.name')}
          helpText={name.message}
        />
        <LabeledInput
          value={speaker.value}
          onChange={speaker.setValue}
          onBlur={() => speaker.setIsOnBlur(true)}
          status={speaker.status}
          type="text"
          label={Translation.translatedText('form.speaker')}
          helpText={speaker.message}
        />
        <TextArea
          initialValue={description.value}
          onChange={(event) => description.setValue(event.target.value)}
          onBlur={() => description.setIsOnBlur(true)}
          status={description.status}
          name={Translation.translatedText('form.description')}
          maxLength={maxTextAreaLength}
          helpText={description.message}
        />
      </div>
      <div className={styles.buttons}>
        <Button callback={props.onCancel} type="default">
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <Button
          callback={(event) => props.onSubmit(getData(), event)}
          type="primary"
          disabled={!checkForm()}
        >
          <TranslatedMessage message={Translation.translatedText('btn.next')} />
        </Button>
      </div>
    </form>
  );
};
