import React, { useState, useEffect } from 'react';
import styles from './MeetupPreviewPage.module.scss';
import MeetupPreview from '../../../components/preview/meetupPreview/MeetupPreview';
import { useParams } from 'react-router-dom';
import { Meetup } from '../../../core/types/Meetup';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useStore } from '../../../context/storeContext';
import { User } from '../../../core/types/User';
import TranslatedMessage from '../../../components/translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

const MeetupPreviewPage = () => {
  const userStore = useStore('UserStore');
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');

  const toTopics = () => {
    navigate('/meetups/Topics');
  };

  const subscribe = async () => {
    if(meetup && userStore.user) {
      const newParticipant = await meetupsStore.addParticipant(meetup?.id, userStore.user);
      if(newParticipant) {
        setParticipants(newParticipant);
      }
    }
  }

  const unsubscribe = async () => {
    if(meetup && userStore.user) {
      const newParticipant = await meetupsStore.deleteParticipant(meetup?.id, userStore.user);
      if(newParticipant) {
        setParticipants(newParticipant);
      }
    }
  }

  const loadMeetup = async () => {
    if (id) {
      const receivedMeetup = await meetupsStore.getMeetupById(id);
      const recievedParticipants = await meetupsStore.getParticipants(id);

      setMeetup(receivedMeetup);
      setParticipants(recievedParticipants);
    }
  };

  const publish = () => {
    if (meetup) {
      meetupsStore.editMeetup({
        ...meetup,
        status: 'CONFIRMED',
      });
    }
    toTopics();
  };

  useEffect(() => {
    loadMeetup();
  }, []);

  return (
    <section className="container smoothPage">
      {meetup && (
        <div className={styles.previewPage}>
          <div className={styles.title}>
            <h1 className="basicH1">
              <TranslatedMessage
                message={Translation.translatedText(
                  'meetups.preview.meetup.title',
                )}
              />
            </h1>
          </div>
          <MeetupPreview
            meetup={meetup}
            participants={participants}
            onCancel={toTopics}
            onPublish={publish}
            onSubscribe={subscribe}
            onUnsubscribe={unsubscribe}
          />
        </div>
      )}
    </section>
  );
};

export default MeetupPreviewPage;
