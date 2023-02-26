import React, { useState, useEffect } from 'react';
import { ProfileInfo } from '../../profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import { Meetup } from '../../../core/types/Meetup';
import { User } from '../../../core/types/User';
import AvailableFor from '../../availableFor/AvailableFor';
import styles from './ThemePreview.module.scss';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

interface ThemePreviewProps {
  meetup: Meetup;
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onApprove: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ThemePreview = (props: ThemePreviewProps): JSX.Element => {
  const [allVotedUsers, setAllVotedUsets] = useState<User[]>([]);

  const loadAllVotedUsers = async () => {
    setAllVotedUsets([
      {
        id: 'aaa-aaa',
        name: 'Leanne',
        surname: 'Graham',
        post: 'Developer',
        roles: 'CHIEF',
      },
    ]);
  };

  useEffect((): void => {
    loadAllVotedUsers();
  }, []);

  return (
    <article>
      <h3 className={styles.caption}>
        <TranslatedMessage message={Translation.translatedText('form.name')} />
      </h3>
      <div className={styles.title}>
        <h2>{props.meetup.subject}</h2>
      </div>
      <h3 className={styles.caption}>
        <TranslatedMessage
          message={Translation.translatedText('form.author')}
        />
      </h3>
      <div className={styles.author}>
        <ProfileInfo
          user={props.meetup.author}
          first="avatar"
          avatarHeightPX={40}
        />
      </div>
      <h3 className={styles.caption}>
        <TranslatedMessage
          message={Translation.translatedText('form.description')}
        />
      </h3>
      <div className={styles.excerpt}>
        <p>{props.meetup.excerpt}</p>
      </div>
      <h3 className={styles.caption}>
        <TranslatedMessage
          message={Translation.translatedText('form.support')}
        />
      </h3>
      <div className={styles.votedUsers}>
        {allVotedUsers.slice(0, 7).map((user) => (
          <div className={styles.customUserAvatar} key={user.id}>
            {user.name[0]}
            {user.surname[0]}
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.cancelButton}
          type="default"
          callback={(event) => props.onCancel(event)}
        >
          <TranslatedMessage
            message={Translation.translatedText('btn.cancel')}
          />
        </Button>
        <AvailableFor roles={['EMPLOYEE']}>
          <div className={styles.mainButtons}>
            <Button
              className={styles.deleteButton}
              type="secondary"
              callback={(event) => props.onDelete(event)}
            >
              <TranslatedMessage
                message={Translation.translatedText('btn.delete')}
              />
            </Button>
            <Button type="primary" callback={(event) => props.onApprove(event)}>
              <TranslatedMessage
                message={Translation.translatedText('btn.approve')}
              />
            </Button>
          </div>
        </AvailableFor>
        <AvailableFor roles={['CHIEF']}>
          <div className={styles.mainButtons}>
            <Button type="primary" callback={(event) => props.onApprove(event)}>
              <TranslatedMessage
                message={Translation.translatedText('btn.support')}
              />
            </Button>
          </div>
        </AvailableFor>
      </div>
    </article>
  );
};
