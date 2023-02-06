import React from 'react';
import styles from './NewsPreview.module.scss'
import defaultNewsImg from '../../../assets/images/default-meetup-img.png'
import { News } from '../../../core/types/News';
import Button from '../../ui/button/Button';

interface NewsPreviewProps {
    news: News
    onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onEdit: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} 

const NewsPreview = (props: NewsPreviewProps) => {
    return (
        <article>
            <div className={styles.img}>
                <img src={props.news.image || defaultNewsImg} alt="meetup img" />
            </div>
            <div className={styles.text}>
                <h2 className={styles.title}>{props.news.title}</h2>
                <p>{props.news.text}</p>
            </div>
            <div className={styles.buttons}>
                <Button type="default" text="Назад" callback={(event) => props.onCancel(event)} />
                <Button type="secondary" text="Редактировать" callback={(event) => props.onEdit(event)} />
            </div>
        </article>
    );
};

export default NewsPreview;