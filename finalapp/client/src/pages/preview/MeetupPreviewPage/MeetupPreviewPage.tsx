import React, { useState, useEffect } from 'react';
import styles from './MeetupPreviewPage.module.scss';
import MeetupPreview from '../../../components/preview/meetupPreview/MeetupPreview';
import { useParams } from 'react-router-dom';
import { Meetup } from '../../../core/types/Meetup';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useStore } from '../../../context/storeContext';

const MeetupPreviewPage = () => {
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');

  const loadMeetup = async () => {
    if (id) {
      const receivedMeetup: Meetup | null = await meetupsStore.getMeetupById(
        id,
      );
      setMeetup(receivedMeetup);
    }
  };

  const toMeetupsPage = () => {
    navigate('/meetups');
  };

  const publish = () => {
    if (meetup) {
      meetupsStore.editMeetup({
        ...meetup,
        status: 'CONFIRMED',
      });
    }
    toMeetupsPage();
  };

  useEffect(() => {
    loadMeetup();
  }, []);

  return (
    <section className="container smoothPage">
      {meetup && (
        <div className={styles.previewPage}>
          <div className={styles.title}>
            <h1 className="basicH1">Просмотр Митапа</h1>
          </div>
          <MeetupPreview
            meetup={meetup}
            onCancel={toMeetupsPage}
            onPublish={publish}
          />
        </div>
      )}
    </section>
  );
};

export default MeetupPreviewPage;
