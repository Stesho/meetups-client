import React from 'react';
import { Meetup } from '../../../core/types/Meetup';
import styles from './MeetupsList.module.scss';
import { MeetupCard } from '../../cards/meetupCard/MeetupCard';
import Button from '../../ui/button/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react-lite';
import AvailableFor from '../../../core/utils/availableFor';
import Translation from '../../../core/utils/translation';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';

interface MeetupsListProps {
  meetups: Array<Meetup>;
  status: 'REQUEST' | 'DRAFT' | 'CONFIRMED'; // for filtering in different tabs
}

export const MeetupsList = observer((props: MeetupsListProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');

  const goToCreateMeetupPage = (): void => navigate('/meetups/create');

  const removeMeetupButtonClick = (meetup: Meetup): void => {
    meetupsStore.deleteMeetup(meetup);
  };

  const editMeetupButtonClick = (meetup: Meetup): void => {
    navigate(`/meetups/edit/${meetup.id}`);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.row}>
        <span className={styles.suggested}>
          <TranslatedMessage
            message={Translation.translatedText('meetups.tab.topics.caption', {
              n: props.meetups.length,
            })}
          />
        </span>
        <AvailableFor roles={['CHIEF', 'EMPLOYEE']}>
          <Button type="secondary" callback={goToCreateMeetupPage}>
            <TranslatedMessage
              message={Translation.translatedText('btn.createMeetup')}
            />
          </Button>
        </AvailableFor>
      </div>
      <div className={styles.meetups}>
        {props.meetups.map(
          (meetup: Meetup): JSX.Element => (
            <MeetupCard
              type={props.status === 'REQUEST' ? 'basic' : 'moderation'}
              onMeetupDelete={removeMeetupButtonClick}
              meetup={meetup}
              key={meetup.id}
              onMeetupEdit={
                props.status === 'DRAFT' ? editMeetupButtonClick : undefined
              }
            />
          ),
        )}
      </div>
    </div>
  );
});

export const Topics = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return <MeetupsList meetups={meetupsStore.requestMeetups} status="REQUEST" />;
});

export const Moderation = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return <MeetupsList meetups={meetupsStore.draftMeetups} status="DRAFT" />;
});

export const FutureMeetups = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return (
    <MeetupsList meetups={meetupsStore.futureMeetups} status="CONFIRMED" />
  );
});

export const PastMeetups = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return <MeetupsList meetups={meetupsStore.pastMeetups} status="CONFIRMED" />;
});
