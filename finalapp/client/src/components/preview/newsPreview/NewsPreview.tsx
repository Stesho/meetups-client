import React from 'react';
import styles from './NewsPreview.module.scss';
import defaultNewsImg from '../../../assets/images/default-meetup-img.png';
import { News } from '../../../core/types/News';
import Button from '../../ui/button/Button';
import AvailableFor from '../../availableFor/AvailableFor';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

interface NewsPreviewProps {
  news: News;
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onEdit: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const NewsPreview = (props: NewsPreviewProps) => {
  return (
    <article className={styles.newsPreview}>
      <div className={styles.img}>
        <img src={props.news.image || defaultNewsImg} alt="meetup img" />
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{props.news.title}</h2>
        <p>{props.news.text}</p>
      </div>
      <div className={styles.buttons}>
        <Button type="default" callback={(event) => props.onCancel(event)}>
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <AvailableFor roles={['CHIEF']}>
          <div className={styles.mainButtons}>
            <Button type="secondary" callback={(event) => props.onEdit(event)}>
              <TranslatedMessage
                message={Translation.translatedText('btn.edit')}
              />
            </Button>
          </div>
        </AvailableFor>
      </div>
    </article>
  );
};

export default NewsPreview;
