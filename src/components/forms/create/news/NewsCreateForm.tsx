import React, { useState } from 'react';
import styles from './NewsCreateForm.module.scss';
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import { CreatedNews } from '../../../../core/types/News';
import { useInput } from '../../../../core/hooks/useInput';
import {
  checkMinLength,
  checkMaxLength,
} from '../../../../core/utils/inputValidation';
import Button from '../../../ui/button/Button';
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';

interface NewsCreateFormProps {
  onCancel: () => void;
  onSubmit: (
    data: CreatedNews,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const minInputLength = 1;
const maxInputLength = 100;
const maxTextAreaLength = 500;

const validationOptions = {
  minLength: checkMinLength(minInputLength),
  maxLength: checkMaxLength(maxInputLength),
};

const NewsCreateForm = (props: NewsCreateFormProps) => {
  const errorMessages = {
    minLength: Translation.translatedText('validation.notEmpty'),
    miaxLength: Translation.translatedText('validation.maxLength'),
  };
  const title = useInput({
    validationOptions,
    errorMessages,
  });
  const text = useInput({
    validationOptions,
    errorMessages,
  });
  const [image, setImage] = useState<string | null>(null);

  const getData = (): CreatedNews => {
    return {
      title: title.value,
      text: text.value,
      image,
    };
  };

  const submitForm = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    props.onSubmit(getData(), event);
  };

  const checkForm = (): boolean => [title, text].every((item) => item.isValid);

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <LabeledInput
          onChange={title.setValue}
          onBlur={() => title.setIsOnBlur(true)}
          status={title.status}
          type="text"
          label={Translation.translatedText('form.header')}
          helpText={title.message}
        />
        <TextArea
          onChange={(event) => text.setValue(event.target.value)}
          onBlur={() => text.setIsOnBlur(true)}
          status={text.status}
          name={Translation.translatedText('form.text')}
          maxLength={maxTextAreaLength}
          helpText={text.message}
        />
        <ImageLoader onLoadCallback={(newImage) => setImage(newImage)} />
      </div>
      <div className={styles.buttons}>
        <Button callback={props.onCancel} type="default">
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <Button callback={submitForm} type="primary" disabled={!checkForm()}>
          <TranslatedMessage
            message={Translation.translatedText('btn.create')}
          />
        </Button>
      </div>
    </form>
  );
};

export default NewsCreateForm;
