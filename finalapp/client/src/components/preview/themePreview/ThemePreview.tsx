import React, { useState, useEffect } from 'react';
import { ProfileInfo } from '../../profile/profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import { Meetup } from '../../../core/types/Meetup';
import { User } from '../../../core/types/User';
import AvailableFor from '../../availableFor/AvailableFor';
import styles from './ThemePreview.module.scss';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';
import { useStore } from '../../../context/storeContext';
import LoadingSpinner from '../../ui/loadingSpinner/LoadingSpinner';
import classNames from 'classnames';
import MoreUsers from '../../profile/moreUsers/MoreUsers';

interface ThemePreviewProps {
  meetup: Meetup;
  votedUsers: User[];
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onApprove: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubscribe: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onUnsubscribe: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ThemePreview = (props: ThemePreviewProps): JSX.Element => {
  const [isVotedUser, setIsVotedUser] = React.useState<boolean>(false);
  const userStore = useStore('UserStore');
  const [subscribeLoader, setSubscribeLoader] = React.useState(false);
  const [unsubscribeLoader, setUnsubscribeLoader] = React.useState(false);

  const subscribeClass = classNames({
    [styles.loader]: subscribeLoader
  });
  const unsubscribeClass = classNames({
    [styles.loader]: unsubscribeLoader
  });

  const isVoted = (): boolean => {
    if(userStore.user) {
      return !!props.votedUsers.find(user => user.id === userStore.user?.id);
    }
    return false;
  }

  const onSubscribe = () => {
    setSubscribeLoader(true);
    props.onSubscribe()
    setUnsubscribeLoader(false);
  }
  
  const onUnsubscribe = () => {
    setUnsubscribeLoader(true);
    props.onUnsubscribe()
    setSubscribeLoader(false);
  }

  useEffect(() => {
    setIsVotedUser(isVoted());
  }, [props.votedUsers]);

  return (
    <article className={styles.themePreview}>
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
        {props.votedUsers.length === 0
          ? <div className={styles.noVotedUsers}>
              <TranslatedMessage
                message={Translation.translatedText('meetups.preview.voteduser.novotedusers')}
              />
            </div>
          : props.votedUsers.slice(0, 10).map((user, index) => {
              if(index === 9) {
                return <MoreUsers usersCount={props.votedUsers.length - 9}/>
              }
              return <ProfileInfo user={user} first="avatar" avatarHeightPX={40} withName={false} key={user.id}/>
            })
        }
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
        <AvailableFor roles={['CHIEF']}>
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
        <AvailableFor roles={['EMPLOYEE']}>
          <div className={styles.mainButtons}>
            {isVotedUser
            ? <Button type="secondary" className={styles.unsubscribeBtn} disabled={unsubscribeLoader} callback={() => onUnsubscribe()}>
                {unsubscribeLoader && <LoadingSpinner spinnerClassName={styles.loader}/>}
                <TranslatedMessage
                  message={Translation.translatedText('btn.unsubscribe')}
                />
              </Button>
            : <Button type="primary" className={styles.subscribeBtn} disabled={subscribeLoader} callback={() => onSubscribe()}>
                {subscribeLoader && <LoadingSpinner spinnerClassName={styles.loader} dotClassName={styles.loaderDot}/>}
                <TranslatedMessage
                  message={Translation.translatedText('btn.subscribe')}
                />
              </Button>
            }
          </div>
        </AvailableFor>
      </div>
    </article>
  );
};
