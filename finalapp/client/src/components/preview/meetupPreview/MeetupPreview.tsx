import React from 'react';
import { Meetup } from '../../../core/types/Meetup';
import calendarIcon from '../../../assets/icons/calendar2-icon.svg';
import clockIcon from '../../../assets/icons/clock-icon.svg';
import mapPinIcon from '../../../assets/icons/map-pin-icon.svg';
import defaultMeetupImg from '../../../assets/images/default-meetup-img.png';
import { ProfileInfo } from '../../profileInfo/profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import AvailableFor from '../../availableFor/AvailableFor';
import styles from './MeetupPreview.module.scss';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import { getMeetupDate, getMeetupTime } from '../../../core/utils/getMeetupDatePlaceInfo';

interface MeetupPreviewProps {
  meetup: Meetup;
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPublish: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MeetupPreview = (props: MeetupPreviewProps) => {
  return (
    <article className={styles.meetupPreview}>
      <div className={styles.img}>
        <img src={props.meetup.image || defaultMeetupImg} alt="meetup img" />
      </div>
      <div className={styles.title}>
        <h2>{props.meetup.subject}</h2>
      </div>
      <h3 className={styles.caption}>
        <TranslatedMessage
          message={Translation.translatedText('form.timeAndPlace')}
        />
      </h3>
      <div className={styles.timePlace}>
        <div className={styles.timePlaceItem}>
          <img
            className={styles.timePlaceIcon}
            src={calendarIcon}
            alt="calendar"
          />
          <span>{getMeetupDate(props.meetup)}</span>
        </div>
        <div className={styles.timePlaceItem}>
          <img className={styles.timePlaceIcon} src={clockIcon} alt="clock" />
          <span>{getMeetupTime(props.meetup)}</span>
        </div>
        <div className={styles.timePlaceItem}>
          <img
            className={styles.timePlaceIcon}
            src={mapPinIcon}
            alt="map pin"
          />
          <span>{props.meetup.place}</span>
        </div>
      </div>
      <h3 className={styles.caption}>
        <TranslatedMessage
          message={Translation.translatedText('form.speaker')}
        />
      </h3>
      <div className={styles.author}>
        <ProfileInfo
          user={props.meetup.author}
          first="avatar"
          avatarHeightPX={40}
        />
      </div>
      <h3 className={styles.caption}>
        <TranslatedMessage
          message={Translation.translatedText('form.description')}
        />
      </h3>
      <div className={styles.excerpt}>
        <p>{props.meetup.excerpt}</p>
      </div>
      <div className={styles.buttons}>
        <Button type="default" callback={(event) => props.onCancel(event)}>
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        {props.meetup.status !== 'CONFIRMED'
          ? <AvailableFor roles={['CHIEF']}>
              <Button
                className={styles.publishBtn}
                type="primary"
                callback={(event) => props.onPublish(event)}
              >
                <TranslatedMessage
                  message={Translation.translatedText('btn.publish')}
                />
              </Button>
            </AvailableFor>
          : null
        }
      </div>
    </article>
  );
};

export default MeetupPreview;
