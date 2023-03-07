import React from 'react';
import { News } from '../../../../core/types/News';
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';
import { TextArea } from '../../../ui/textArea/TextArea';
import Button from '../../../ui/button/Button';
import defaultImage from '../../../../assets/images/default-meetup-img.png';
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import styles from './EditNewsForm.module.scss';
import ImageEditor from '../../../imageEditor/ImageEditor';

interface EditNewsFormProps {
  news: News,
  onCancel: () => void,
  onSave: (news: News) => void
}

const EditNewsForm = (props: EditNewsFormProps) => {
  const [image, setImage] = React.useState<string>(props.news.image || '');
  const [title, setTitle] = React.useState<string>(props.news.title || '');
  const [text, setText] = React.useState<string>(props.news.text || '');

  const getData = (): News => {
    const news = {
      id: props.news.id,
      publicationDate: props.news.publicationDate,
      image,
      title,
      text
    }

    return news;
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <div className={styles.photo}>
          <span className={styles.caption}>
            <TranslatedMessage
              message={Translation.translatedText('form.photo')}
            />
          </span>
          <div className={styles.imgWrapper}>
            <img src={image || defaultImage} className={styles.img} alt="#" />
            <ImageEditor onLoadCallback={(newImage) => setImage(newImage || defaultImage)} className={styles.imageLoader}/>
          </div>
        </div>
        <div className={styles.theme}>
          <LabeledInput
            onChange={setTitle}
            initialValue={title}
            label={Translation.translatedText('form.header')}
          />
        </div>
        <div className={styles.description}>
          <TextArea
            onChange={(event) => setText(event.target.value)}
            initialValue={text}
            className={styles.textarea}
            name={Translation.translatedText('form.text')}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button callback={props.onCancel} type="default">
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <Button callback={() => props.onSave(getData())} type="primary">
          <TranslatedMessage
            message={Translation.translatedText('btn.save')}
          />
        </Button>
      </div>
    </form>
  );
};

export default EditNewsForm;