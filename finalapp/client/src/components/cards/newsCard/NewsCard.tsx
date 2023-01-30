import React from 'react'
import { News } from '../../../core/types/News'
import { getNewsDate } from '../../../core/utils/getNewsDate'
import defaultNewsImg from '../../../assets/images/default-meetup-img.png'
import styles from './NewsCard.module.scss'

export interface NewsCardProps {
    news: News
}

export const NewsCard = ({ news }: NewsCardProps): JSX.Element => {
    return (
        <article className={styles.newsCard}>
            <div className={styles.image}>
                <img src={defaultNewsImg} alt="news"/>
            </div>
            <div className={styles.newsInfo}>
                <span className={styles.newsDate}>{getNewsDate(news)}</span>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsText}>{news.text}</p>
            </div>
        </article>
    )
}
