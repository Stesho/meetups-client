import classNames from 'classnames';
import React from 'react';
import styles from './ProfileInfo.module.scss';
import { ShortUser } from '../../core/types/User';

export interface ProfileInfoProps {
  user: ShortUser;
  first: 'name' | 'avatar';
  avatarHeightPX: number;
  withName?: boolean;
  text?: {
    fontWeight?: string;
    fontSize?: string;
    color?: string;
  };
  style?: Record<string, string>;
}

export const ProfileInfo = ({
  user,
  first,
  withName,
  avatarHeightPX,
  text,
  style,
}: ProfileInfoProps) => {
  return (
    <div style={style} className={styles.userInfo}>
      <div
        style={{ width: `${avatarHeightPX}px`, height: `${avatarHeightPX}px` }}
        className={classNames(
          styles.customUserAvatar,
          styles[`user${first}First`],
        )}
      >
        {user.name[0]}
        {user.surname[0]}
        {user.name === '' && user.surname === '' && '-'}
      </div>
      {withName === false
      ? null
      : <span style={{ ...text }}>
          {user.name} {user.surname}
        </span>
      }
    </div>
  );
};
