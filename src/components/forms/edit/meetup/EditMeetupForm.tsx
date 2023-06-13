import React, { useState } from 'react';
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../../ui/textArea/TextArea';
import { DateInput } from '../../../ui/dateInput/DateInput';
import { Meetup } from '../../../../core/types/Meetup';
import Button from '../../../ui/button/Button';
import defaultMeetupImg from '../../../../assets/images/default-meetup-img.png';
import styles from './EditMeetupForm.module.scss';
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';
import dateToISOString from '../../../../core/utils/dateToISOString';
import dateFromISOToReadable from '../../../../core/utils/dateFromISOToReadable';
import { useInput } from '../../../../core/hooks/useInput';
import { checkDateValidity } from '../../../../core/utils/checkDateValidity/checkDateValidity';
import { checkDatesValidity } from '../../../../core/utils/checkDateValidity/checkDateValidity';
import ImageEditor from '../../../imageEditor/ImageEditor';

export type MeetupData = Pick<
  Meetup,
  'image' | 'start' | 'finish' | 'subject' | 'place' | 'author' | 'excerpt'
>;

interface EditMeetupFormProps extends MeetupData {
  onCancel: () => void;
  onSave: (
    data: MeetupData,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onPreview: () => void;
}

const validationOptions = {
  validDate: checkDateValidity,
};

const errorMessages = {
  validDate: Translation.translatedText('validation.date.format'),
};

export const EditMeetupForm = (props: EditMeetupFormProps): JSX.Element => {
  const start = useInput({
    initialValue: dateFromISOToReadable(props.start || ''),
    validationOptions,
    errorMessages,
  });
  const finish = useInput({
    initialValue: dateFromISOToReadable(props.finish || ''),
    validationOptions,
    errorMessages,
  });
  const [image, setImage] = useState<string>(props.image || defaultMeetupImg);
  const [subject, setTheme] = useState<string>(props.subject);
  const [isValidDates, setIsValidDates] = useState<boolean>(false);
  const [place, setPlace] = useState<string>(props.place || '');
  const [excerpt, setDescription] = useState<string>(props.excerpt);
  const [author, setSpeaker] = useState<string>(
    `${props.author.name} ${props.author.surname}`,
  );

  const checkForm = () => (
    [start, finish].every((input) => input.value !== '' && input.status !== 'invalid') &&
    isValidDates
  );

  const parseAuthor = (author: string) => {
    return author.split(' ');
  };

  const getData = (): MeetupData => {
    const [name, surname] = parseAuthor(author);

    return {
      image,
      start: dateToISOString(start.value),
      finish: dateToISOString(finish.value),
      subject,
      place,
      author: {
        id: props.author.id,
        name,
        surname,
      },
      excerpt,
    };
  };

  const preventDefaultSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
  }

  React.useEffect(() => {
    checkDatesValidity(start.value, finish.value)
      ? setIsValidDates(true)
      : setIsValidDates(false);
  }, [start.value, finish.value]);

  return (
    <form className={styles.form} onSubmit={preventDefaultSubmit}>
      <div className={styles.inputs}>
        <div className={styles.photo}>
          <span className={styles.caption}>
            <TranslatedMessage
              message={Translation.translatedText('form.photo')}
            />
          </span>
          <div className={styles.imgWrapper}>
            <img src={image} className={styles.img} alt="#" />
            <ImageEditor onLoadCallback={(newImage) => setImage(newImage || defaultMeetupImg)} className={styles.imageLoader}/>
          </div>
        </div>
        <div className={styles.theme}>
          <LabeledInput
            onChange={setTheme}
            initialValue={subject}
            label={Translation.translatedText('form.subject')}
          />
        </div>
        <div className={styles.dates}>
          <DateInput
            id="start"
            value={start.value}
            setValue={start.setValue}
            onBlur={() => start.setIsOnBlur(true)}
            className={styles.date}
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
            className={styles.date}
            status={isValidDates ? finish.status : 'invalid'}
            label={Translation.translatedText('form.finish')}
            helpText={
              isValidDates
                ? finish.message
                : Translation.translatedText('validation.date.finish')
            }
          />
        </div>
        <div className={styles.place}>
          <LabeledInput
            onChange={setPlace}
            initialValue={place}
            label={Translation.translatedText('form.place')}
          />
        </div>
        <div className={styles.speaker}>
          <LabeledInput
            onChange={setSpeaker}
            initialValue={author}
            label={Translation.translatedText('form.speaker')}
          />
        </div>
        <div className={styles.description}>
          <TextArea
            onChange={(event) => setDescription(event.target.value)}
            initialValue={excerpt}
            className={styles.textarea}
            name={Translation.translatedText('form.description')}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button callback={props.onCancel} type="default">
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <div>
          <Button
            className={styles.previewButton}
            callback={props.onPreview}
            type="secondary"
          >
            <TranslatedMessage
              message={Translation.translatedText('btn.preview')}
            />
          </Button>
          <Button
            callback={(event) => props.onSave(getData(), event)}
            type="primary"
            disabled={!checkForm()}
          >
            <TranslatedMessage
              message={Translation.translatedText('btn.save')}
            />
          </Button>
        </div>
      </div>
    </form>
  );
};
