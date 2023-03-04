import React, { useState, useEffect } from 'react';
import { EditMeetupForm } from '../../components/forms/edit/EditMeetupForm';
import { MeetupData } from '../../components/forms/edit/EditMeetupForm';
import { Meetup } from '../../core/types/Meetup';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../context/storeContext';
import styles from './EditMeetupPage.module.scss';
import TranslatedMessage from '../../components/translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';

export const EditMeetupPage = () => {
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const navigate: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');

  const { id } = useParams();

  const onCancel = (): void => {
    navigate('/meetups/moderation');
  };

  const onPreview = (): void => {
    navigate(`/meetups/preview/${meetup!.id}`);
  };

  const onSave = async (
    data: MeetupData,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const newMeetup = {
      id: meetup!.id,
      subject: data.subject,
      place: data.place,
      excerpt: data.excerpt,
      image: data.image,
      speakers: meetup!.speakers,
      modified: new Date().toISOString(),
      isOver: meetup!.isOver,
      status: meetup!.status,
      start: data.start,
      finish: data.finish,
      votedUsersCount: meetup!.votedUsersCount,
      participantsCount: meetup!.participantsCount,
      author: data.author,
    };
    await meetupsStore.editMeetup(newMeetup);
    navigate(`/meetups/moderation`);
  };

  const loadMeetup = async () => {
    if (id) {
      const receivedMeetup: Meetup | null = await meetupsStore.getMeetupById(
        id,
      );
      setMeetup(receivedMeetup);
    }
  };

  useEffect(() => {
    loadMeetup();
  }, []);

  return (
    <section className="container smoothPage">
      {meetup && (
        <div className={styles.editMeetupPage}>
          <div className={styles.title}>
            <h1 className="basicH1">
              <TranslatedMessage
                message={Translation.translatedText('meetups.edit.title')}
              />
            </h1>
          </div>
          <EditMeetupForm
            image={meetup?.image || ''}
            start={meetup?.start || ''}
            finish={meetup?.finish || ''}
            subject={meetup?.subject || ''}
            author={meetup?.author || ''}
            excerpt={meetup?.excerpt || ''}
            place={meetup?.place || ''}
            onCancel={onCancel}
            onSave={onSave}
            onPreview={onPreview}
          />
        </div>
      )}
    </section>
  );
};
