import React from 'react';
import { Meetup } from '../../../core/types/Meetup';
import calendarIcon from '../../../assets/icons/calendar2-icon.svg';
import clockIcon from '../../../assets/icons/clock-icon.svg';
import mapPinIcon from '../../../assets/icons/map-pin-icon.svg';
import defaultMeetupImg from '../../../assets/images/default-meetup-img.png';
import { ProfileInfo } from '../../profile/profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import AvailableFor from '../../availableFor/AvailableFor';
import styles from './MeetupPreview.module.scss';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import { getMeetupDate, getMeetupTime } from '../../../core/utils/getMeetupDatePlaceInfo';
import { User } from '../../../core/types/User';
import LoadingSpinner from '../../ui/loadingSpinner/LoadingSpinner';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../context/storeContext';

interface MeetupPreviewProps {
  meetup: Meetup;
  participants: User[];
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPublish: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubscribe: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onUnsubscribe: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MeetupPreview = observer((props: MeetupPreviewProps) => {
  const userStore = useStore('UserStore');
  const [isParticipant, setIsParticipant] = React.useState<boolean>(false);
  const [subscribeLoader, setSubscribeLoader] = React.useState(false);
  const [unsubscribeLoader, setUnsubscribeLoader] = React.useState(false);

  const isFutureMeetup = (): boolean => {
    return new Date(props.meetup.start) > new Date()
  }

  const checkIsParticipant = (): boolean => {
    if(userStore.user) {
      return !!props.participants.find(user => user.id === userStore.user?.id);
    }
    return false;
  }

  const onSubscribe = () => {
    setSubscribeLoader(true);
    props.onSubscribe();
    setUnsubscribeLoader(false);
  }
  
  const onUnsubscribe = () => {
    setUnsubscribeLoader(true);
    props.onUnsubscribe();
    setSubscribeLoader(false);
  }

  React.useEffect(() => {
    setIsParticipant(checkIsParticipant());
  }, [props.participants]);

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
        {isFutureMeetup() && (
          <AvailableFor roles={['EMPLOYEE']}>
            {isParticipant
              ? <Button type="secondary" className={styles.unsubscribeBtn} disabled={unsubscribeLoader} callback={() => onUnsubscribe()}>
                  {unsubscribeLoader && <LoadingSpinner loaderClassName={styles.loader} spinnerClassName={styles.spinner} />}
                  <TranslatedMessage
                    message={Translation.translatedText('btn.unsubscribe')}
                  />
                </Button>
              : <Button type="primary" className={styles.subscribeBtn} disabled={subscribeLoader} callback={() => onSubscribe()}>
                  {subscribeLoader && <LoadingSpinner loaderClassName={styles.loader} spinnerClassName={styles.spinner} />}
                  <TranslatedMessage
                    message={Translation.translatedText('btn.subscribe')}
                  />
                </Button>
            }
          </AvailableFor>
        )}
      </div>
    </article>
  );
});

export default MeetupPreview;
