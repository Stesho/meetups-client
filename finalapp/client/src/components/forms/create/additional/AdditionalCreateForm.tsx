import React, { useEffect, useState } from 'react';
import styles from './AdditionalCreateForm.module.scss';
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { DateInput } from '../../../ui/dateInput/DateInput';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import { Meetup } from '../../../../core/types/Meetup';
import { useInput } from '../../../../core/hooks/useInput';
import {
  checkDateValidity,
  checkDatesValidity,
} from '../../../../core/utils/checkDateValidity/checkDateValidity';
import dateToISOString from '../../../../core/utils/dateToISOString';
import Button from '../../../ui/button/Button';
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';

export type FormAdditionalData = Pick<
  Meetup,
  'start' | 'finish' | 'place' | 'image'
>;

interface AdditionalCreateFormProps {
  onSubmit: (
    data: FormAdditionalData,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onCancel: () => void;
}

const validationOptions = {
  validDate: checkDateValidity,
};

export const AdditionalCreateForm = (
  props: AdditionalCreateFormProps,
): JSX.Element => {
  const errorMessages = {
    validDate: Translation.translatedText('validation.date.format'),
  };
  const start = useInput({
    validationOptions,
    errorMessages,
  });
  const finish = useInput({
    validationOptions,
    errorMessages,
  });
  const [place, setPlace] = useState<string>('');
  const [image, setImage] = useState<string | null>('');
  const [isValidDates, setIsValidDates] = useState<boolean>(false);

  const checkForm = () => (
    [start, finish].every((input) => input.status !== 'invalid') &&
    isValidDates
  );

  const getData = (): FormAdditionalData => {
    return {
      start: dateToISOString(start.value),
      finish: dateToISOString(finish.value),
      place,
      image,
    };
  };

  const submitForm = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    props.onSubmit(getData(), event);
  };

  useEffect(() => {
    checkDatesValidity(start.value, finish.value)
      ? setIsValidDates(true)
      : setIsValidDates(false);
  }, [start.value, finish.value]);

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <div className={styles.dateInputs}>
          <DateInput
            id="start"
            value={start.value}
            setValue={start.setValue}
            onBlur={() => start.setIsOnBlur(true)}
            className={styles.dateInput}
            status={isValidDates ? start.status : 'invalid'}
            label={Translation.translatedText('form.start')}
            helpText={
              isValidDates
                ? start.message
                : Translation.translatedText('validation.date.start')
            }
          />
          <DateInput
            id="finish"
            value={finish.value}
            setValue={finish.setValue}
            onBlur={() => finish.setIsOnBlur(true)}
            className={styles.dateInput}
            status={isValidDates ? finish.status : 'invalid'}
            label={Translation.translatedText('form.finish')}
            helpText={
              isValidDates
                ? finish.message
                : Translation.translatedText('validation.date.finish')
            }
          />
        </div>
        <LabeledInput
          onChange={setPlace}
          type="text"
          label={Translation.translatedText('form.place')}
        />
        <ImageLoader onLoadCallback={(newImage) => setImage(newImage)} />
      </div>
      <div className={styles.buttons}>
        <Button id="cancelBtn" callback={props.onCancel} type="default">
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <Button id="submitBtn" callback={submitForm} type="primary" disabled={!checkForm()}>
          <TranslatedMessage
            message={Translation.translatedText('btn.create')}
          />
        </Button>
      </div>
    </form>
  );
};
