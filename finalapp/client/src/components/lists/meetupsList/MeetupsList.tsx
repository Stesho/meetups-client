import React from 'react';
import { Meetup } from '../../../core/types/Meetup';
import styles from './MeetupsList.module.scss';
import { MeetupCard } from '../../cards/meetupCard/MeetupCard';
import Button from '../../ui/button/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react-lite';
import AvailableFor from '../../availableFor/AvailableFor';
import Translation from '../../../core/utils/translation';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';

interface ListHeaderProps {
  text: Translation;
} 

interface MeetupsListProps extends ListHeaderProps {
  meetups: Array<Meetup>;
  status: 'REQUEST' | 'DRAFT' | 'CONFIRMED'; // for filtering in different tabs
}

const ListHeader = (props: ListHeaderProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const goToCreateMeetupPage = (): void => navigate('/meetups/create');

  return (
    <div className={styles.row}>
      <span className={styles.suggested}>
        <TranslatedMessage
          message={props.text}
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
  )
}

export const MeetupsList = observer((props: MeetupsListProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');

  const removeMeetupButtonClick = (meetup: Meetup): void => {
    meetupsStore.deleteMeetup(meetup);
  };

  const editMeetupButtonClick = (meetup: Meetup): void => {
    navigate(`/meetups/edit/${meetup.id}`);
  };

  return (
    <div className={styles.listContainer}>
      <ListHeader text={props.text} />
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

  return (
    <MeetupsList
      meetups={meetupsStore.requestMeetups}
      status="REQUEST"
      text={Translation.translatedText('meetups.tab.topics.caption', {
        n: meetupsStore.requestMeetups.length,
      })}
    />
  );
});

export const Moderation = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return (
    <MeetupsList
      meetups={meetupsStore.draftMeetups}
      status="DRAFT"
      text={Translation.translatedText('meetups.tab.moderation.caption', {
        n: meetupsStore.draftMeetups.length,
      })}
    />
  );
});

export const FutureMeetups = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return (
    <MeetupsList
      meetups={meetupsStore.futureMeetups}
      status="CONFIRMED"
      text={Translation.translatedText('meetups.tab.future.caption', {
        n: meetupsStore.futureMeetups.length,
      })}
    />
  );
});

export const PastMeetups = observer((): JSX.Element => {
  const meetupsStore = useStore('MeetupsStore');

  return (
    <MeetupsList
      meetups={meetupsStore.pastMeetups}
      status="CONFIRMED"
      text={Translation.translatedText('meetups.tab.past.caption', {
        n: meetupsStore.pastMeetups.length,
      })}
    />
  );
});
