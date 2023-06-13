import React, { useEffect, useState } from 'react';
import styles from './ThemePreviewPage.module.scss';
import { ThemePreview } from '../../../components/preview/themePreview/ThemePreview';
import { useParams } from 'react-router-dom';
import { Meetup } from '../../../core/types/Meetup';
import { User } from '../../../core/types/User';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useStore } from '../../../context/storeContext';
import TranslatedMessage from '../../../components/translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

const ThemePreviewPage = () => {
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [votedUsers, setVotedUsers] = useState<User[]>([]);
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');
  const userStore = useStore('UserStore');

  const redirectToOnModeration = () => {
    navigate('/meetups/moderation');
  };

  const redirectToTopics = () => {
    navigate('/meetups/topics');
  };

  const approveTheme = () => {
    if (meetup) {
      meetupsStore.editMeetup({
        ...meetup,
        status: 'DRAFT',
      });
    }
    redirectToOnModeration();
  };

  const subscribe = async () => {
    if(meetup && userStore.user) {
      const newVotedUsers = await meetupsStore.addVoteduser(meetup?.id, userStore.user);
      if(newVotedUsers) {
        setVotedUsers(newVotedUsers);
      }
    }
  }

  const unsubscribe = async () => {
    if(meetup && userStore.user) {
      const newVotedUsers = await meetupsStore.deleteVoteduser(meetup?.id, userStore.user);
      if(newVotedUsers) {
        setVotedUsers(newVotedUsers);
      }
    }
  }

  const deleteMeetup = () => {
    if (meetup) {
      meetupsStore.deleteMeetup(meetup);
    }
    redirectToTopics();
  };

  const loadData = async () => {
    if (id) {
      const receivedMeetup = await meetupsStore.getMeetupById(id);
      const votedUsers = await meetupsStore.getVotedusers(id);

      setMeetup(receivedMeetup);
      setVotedUsers(votedUsers);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="container smoothPage">
      {meetup && (
        <div className={styles.previewPage}>
          <div className={styles.title}>
            <h1 className="basicH1">
              <TranslatedMessage
                message={Translation.translatedText(
                  'meetups.preview.theme.title',
                )}
              />
            </h1>
          </div>
          <ThemePreview
            meetup={meetup}
            votedUsers={votedUsers}
            onCancel={redirectToTopics}
            onDelete={deleteMeetup}
            onApprove={approveTheme}
            onSubscribe={subscribe}
            onUnsubscribe={unsubscribe}
          />
        </div>
      )}
    </section>
  );
};

export default ThemePreviewPage;
