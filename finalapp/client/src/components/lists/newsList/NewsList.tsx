import React from 'react';
import { News } from '../../../core/types/News';
import { NewsCard } from '../../cards/newsCard/NewsCard';
import styles from './NewsList.module.scss';

interface NewsListProps {
  news: News[]
}

const NewsList = (props: NewsListProps) => {
  return (
    <div className={styles.newsList}>
      {props.news.map((news: News) => (
        <NewsCard news={news} key={news.id}/>
      ))}
    </div>
  );
};

export default NewsList;