import React from 'react';
import styles from './MoreUsers.module.scss';

interface MoreUsersProps {
  usersCount: number
}

const MoreUsers = (props: MoreUsersProps) => {
  return (
    <div className={styles.moreUsers}>
      +{props.usersCount}
    </div>
  );
};

export default MoreUsers;