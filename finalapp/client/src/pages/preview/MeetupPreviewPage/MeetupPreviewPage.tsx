import React, { useState, useEffect } from 'react';
import styles from './MeetupPreviewPage.module.scss'
import MeetupPreview from '../../../components/preview/meetupPreview/MeetupPreview';
import { useParams } from 'react-router-dom';
import { getMeetupFromServerById } from '../../../core/utils/getMeetupFromServerById';
import { Meetup } from '../../../core/types/Meetup';

const MeetupPreviewPage = () => {
  const [meetup, setMeetup] = useState<Meetup | null>(null)
  const { id } = useParams()

  const loadMeetup = async () => {
    if (id) {
      const receivedMeetup: Meetup | null = await getMeetupFromServerById(id)
      setMeetup(receivedMeetup)
    }
  }

  useEffect(() => {
    loadMeetup()
  }, [])

  return (
    <section className="container smoothPage">
      {meetup && (
        <div className={styles.previewPage}>
          <div className={styles.title}>
              <h1 className="basicH1">Просмотр Митапа</h1>
          </div>
          <MeetupPreview meetup={meetup} onCancel={() => {}} onPublish={() => {}}/>
        </div>
      )}
    </section>
  );
};

export default MeetupPreviewPage;