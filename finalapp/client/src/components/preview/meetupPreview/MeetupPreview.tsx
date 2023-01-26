import React from 'react';
import { Meetup } from '../../../core/types/Meetup';
import calendarIcon from '../../../assets/icons/calendar2-icon.svg'
import clockIcon from '../../../assets/icons/clock-icon.svg'
import mapPinIcon from '../../../assets/icons/map-pin-icon.svg'
import defaultMeetupImg from '../../../assets/images/default-meetup-img.png'
import { ProfileInfo } from '../../profileInfo/ProfileInfo';
import Button from '../../ui/button/Button';
import styles from './MeetupPreview.module.scss'

interface MeetupPreviewProps {
    meetup: Meetup
    onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onPublish: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} 

const MeetupPreview = (props: MeetupPreviewProps) => {
    return (
        <article>
            <div className={styles.img}>
                <img src={props.meetup.image || defaultMeetupImg} alt="meetup img" />
            </div>
            <div className={styles.title}>
                <h2>{props.meetup.subject}</h2>
            </div>
            <h3 className={styles.caption}>Время и место проведения</h3>
            <div className={styles.timePlace}>
                <div className={styles.timePlaceItem}>
                    <img className={styles.timePlaceIcon} src={calendarIcon} alt="calendar" />
                    <span>Date</span>
                </div>
                <div className={styles.timePlaceItem}>
                    <img className={styles.timePlaceIcon} src={clockIcon} alt="clock" />
                    <span>Time</span>
                </div>
                <div className={styles.timePlaceItem}>
                    <img className={styles.timePlaceIcon} src={mapPinIcon} alt="map pin" />
                    <span>{props.meetup.place}</span>
                </div>
            </div>
            <h3 className={styles.caption}>Спикер</h3>
            <div className={styles.author}>
                <ProfileInfo user={props.meetup.author} first="avatar" avatarHeightPX={40} />
            </div>
            <h3 className={styles.caption}>Описание</h3>
            <div className={styles.excerpt}>
                <p>{props.meetup.excerpt}</p>
            </div>
            <div className={styles.buttons}>
                <Button type="default" text="Назад" callback={(event) => props.onCancel(event)} />
                <Button type="primary" text="Опубликовать" callback={(event) => props.onPublish(event)} />
            </div>
        </article>
    );
};

export default MeetupPreview;