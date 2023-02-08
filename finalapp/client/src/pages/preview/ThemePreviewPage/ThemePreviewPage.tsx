import React, { useEffect, useState } from 'react';
import styles from './ThemePreviewPage.module.scss'
import { ThemePreview } from '../../../components/preview/themePreview/ThemePreview';
import { useParams } from 'react-router-dom';
import { Meetup } from '../../../core/types/Meetup';
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useStore } from '../../../context/storeContext';

const ThemePreviewPage = () => {
  const [meetup, setMeetup] = useState<Meetup | null>(null)
  const { id } = useParams()
  const navigate: NavigateFunction = useNavigate()
  const meetupsStore = useStore('MeetupsStore')

  const loadMeetup = async () => {
    if (id) {
      const receivedMeetup: Meetup | null = await meetupsStore.getMeetupById(id)
      setMeetup(receivedMeetup)
    }
  }

  const toMeetupsPage = () => {
    navigate('/meetups')
  }

  const approveTheme = () => {
    if(meetup) {
      meetupsStore.editMeetup({
        ...meetup,
        status: 'DRAFT'
      })
    }
    toMeetupsPage()
  }
  
  const deleteMeetup = () => {
    if(meetup) {
      meetupsStore.deleteMeetup(meetup)
    }
    toMeetupsPage()
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
          <ThemePreview meetup={meetup} onCancel={toMeetupsPage} onDelete={deleteMeetup} onApprove={approveTheme}/>
        </div>
      )}
    </section>
  );
};

export default ThemePreviewPage;