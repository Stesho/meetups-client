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
  const userStore = useStore('UserStore');
  const [isVotedUser, setIsVotedUser] = React.useState<boolean>(false);
  const [subscribeLoader, setSubscribeLoader] = React.useState(false);
  const [unsubscribeLoader, setUnsubscribeLoader] = React.useState(false);
  const [renderedVotedCount, setRenderedVotedCount] = React.useState(10);
  const votedUsersClass = classNames(styles.votedUsers,
    props.votedUsers.length === renderedVotedCount ? styles.jc_start : styles.jc_spaceBetween
  )

  const getRenderedVotedCount = (): void => {
    const pageWidth = document.documentElement.scrollWidth;
    if(pageWidth <= 425) {
      setRenderedVotedCount(4);
    }
    else if(pageWidth <= 615) {
      setRenderedVotedCount(6);
    }
    else {
      setRenderedVotedCount(10);
    }
  }
  
  const checkIsVoted = (): boolean => {
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
    setIsVotedUser(checkIsVoted());
    window.addEventListener("resize", getRenderedVotedCount);
    return () => {
      window.removeEventListener("resize", getRenderedVotedCount);
    };
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
      <div className={votedUsersClass}>
        {props.votedUsers.length === 0
          ? <div className={styles.noVotedUsers}>
              <TranslatedMessage
                message={Translation.translatedText('meetups.preview.voteduser.novotedusers')}
              />
            </div>
          : props.votedUsers.slice(0, renderedVotedCount).map((user, index) => {
              if(index === renderedVotedCount - 1) {
                return <MoreUsers usersCount={props.votedUsers.length - renderedVotedCount + 1} key={user.id}/>
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
                {unsubscribeLoader && <LoadingSpinner loaderClassName={styles.loader} spinnerClassName={styles.spinner} />}
                <TranslatedMessage
                  message={Translation.translatedText('btn.unvote')}
                />
              </Button>
            : <Button type="primary" className={styles.subscribeBtn} disabled={subscribeLoader} callback={() => onSubscribe()}>
                {subscribeLoader && <LoadingSpinner loaderClassName={styles.loader} spinnerClassName={styles.spinner} />}
                <TranslatedMessage
                  message={Translation.translatedText('btn.vote')}
                />
              </Button>
            }
          </div>
        </AvailableFor>
      </div>
    </article>
  );
};
