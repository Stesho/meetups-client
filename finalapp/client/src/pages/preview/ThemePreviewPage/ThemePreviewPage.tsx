import React, { useEffect, useState } from 'react';
import styles from './ThemePreviewPage.module.scss'
import { PreviewTheme } from '../../../components/preview/themePreview/ThemePreview';
import { useParams } from 'react-router-dom';
import { getMeetupFromServerById } from '../../../core/utils/getMeetupFromServerById';
import { Meetup } from '../../../core/types/Meetup';

const ThemePreviewPage = () => {
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
              <h1 className="basicH1">Просмотр Темы</h1>
          </div>
          <PreviewTheme meetup={meetup} onCancel={() => {}} onDelete={() => {}} onApprove={() => {}}/>
        </div>
      )}
    </section>
  );
};

export default ThemePreviewPage;