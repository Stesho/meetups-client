import React from 'react';
import styles from './MeetupCard.module.scss';
import profileIcon from '../../../assets/icons/profile-icon.svg';
import { Meetup } from '../../../core/types/Meetup';
import { RedactorButton } from '../../ui/redactorButton/RedactorButton';
import { ProfileInfo } from '../../profileInfo/profileInfo/ProfileInfo';
import { getMeetupDatePlaceInfo } from '../../../core/utils/getMeetupDatePlaceInfo';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import AvailableFor from '../../availableFor/AvailableFor';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

export interface MeetupCardProps {
  meetup: Meetup;
  type: 'basic' | 'moderation';
  onMeetupDelete: (meetup: Meetup) => void;
  onMeetupEdit?: (meetup: Meetup) => void;
}

export const MeetupCard = ({
  meetup,
  type,
  onMeetupDelete,
  onMeetupEdit,
}: MeetupCardProps): JSX.Element => {
  const onDelete = () => onMeetupDelete(meetup);
  const navigate: NavigateFunction = useNavigate();
  let onEdit;

  if (onMeetupEdit) {
    onEdit = () => onMeetupEdit(meetup);
  }

  const toPreviewMeetupPage = () => {
    navigate(`/meetups/preview/${meetup.id}`);
  };

  const toPreviewThemePage = () => {
    navigate(`/meetups/theme-preview/${meetup.id}`);
  };

  return (
    <article className={styles.meetupCard}>
      <div className={styles.topLine}>
        {type === 'basic' ? (
          <ProfileInfo
            user={meetup.author}
            first="avatar"
            avatarHeightPX={30}
            text={{ fontWeight: '400', fontSize: '14px', color: '#5B6887' }}
          />
        ) : (
          <div className={styles.meetupDateInfo}>
            {getMeetupDatePlaceInfo(meetup)}
          </div>
        )}
        <div className={styles.editCard}>
          <AvailableFor roles={['CHIEF']}>
            <RedactorButton type="delete" onClick={onDelete} />
          </AvailableFor>
          {type === 'moderation' && typeof onEdit !== 'undefined' && (
            <AvailableFor roles={['CHIEF']}>
              <RedactorButton
                type="edit"
                onClick={onEdit}
                style={{ marginLeft: '32px' }}
              />
            </AvailableFor>
          )}
        </div>
      </div>
      <div className={styles.meetupInfo}>
        <h3
          className={styles.meetupSubject}
          onClick={type === 'basic' ? toPreviewThemePage : toPreviewMeetupPage}
        >
          {meetup.subject}
        </h3>
        <p className={styles.meetupExcerpt}>{meetup.excerpt}</p>
      </div>
      {type === 'basic' ? (
        <div className={styles.bottomLine}>
          <img src={profileIcon} alt="profile" />
          <span className={styles.supportInfo}>
            <TranslatedMessage
              message={Translation.translatedText('meetups.card.support', {
                n: meetup.votedUsersCount,
              })}
            />
          </span>
        </div>
      ) : (
        <ProfileInfo
          user={meetup.author}
          first="avatar"
          avatarHeightPX={30}
          text={{ fontWeight: '400', fontSize: '14px', color: '#5B6887' }}
        />
      )}
    </article>
  );
};
