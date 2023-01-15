import React from 'react'
import { News } from '../../../core/types/News'
import { getNewsDate } from '../../../core/utils/getNewsDate'
import styles from './NewsCard.module.scss'

export interface NewsCardProps {
    news: News
}

export const NewsCard = ({ news }: NewsCardProps): JSX.Element => {
    return (
        <article className={styles.newsCard}>
            <div>{news.image && <img className={styles.image} src={news.image} />}</div>
            <div className={styles.newsInfo}>
                <span className={styles.newsDate}>{getNewsDate(news)}</span>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsText}>{news.text}</p>
            </div>
        </article>
    )
}
