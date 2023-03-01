import React, { useState } from 'react';
import { LabeledInput } from '../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../ui/textArea/TextArea';
import { DateInput } from '../../ui/dateInput/DateInput';
import { Meetup } from '../../../core/types/Meetup';
import Button from '../../ui/button/Button';
import defaultMeetupImg from '../../../assets/images/default-meetup-img.png';
import styles from './EditMeetupForm.module.scss';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import dateToISOString from '../../../core/utils/dateToISOString';
import dateFromISOToReadable from '../../../core/utils/dateFromISOToReadable';

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

export const EditMeetupForm = (props: EditMeetupFormProps): JSX.Element => {
  const [subject, setTheme] = useState<string>(props.subject);
  const [start, setStart] = useState<string>(dateFromISOToReadable(props.start || ''));
  const [finish, setFinish] = useState<string>(dateFromISOToReadable(props.finish || ''));
  const [place, setPlace] = useState<string>(props.place || '');
  const [excerpt, setDescription] = useState<string>(props.excerpt);
  const [author, setSpeaker] = useState<string>(
    `${props.author.name} ${props.author.surname}`,
  );

  const image = props.image || defaultMeetupImg;

  const parseAuthor = (author: string) => {
    return author.split(' ');
  };

  const getData = (): MeetupData => {
    const [name, surname] = parseAuthor(author);

    return {
      image,
      start: dateToISOString(start),
      finish: dateToISOString(finish),
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
            id={'start'}
            setValue={setStart}
            value={start}
            className={styles.date}
            label={Translation.translatedText('form.start')}
          />
          <DateInput
            id={'finish'}
            setValue={setFinish}
            value={finish}
            className={styles.date}
            label={Translation.translatedText('form.finish')}
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
