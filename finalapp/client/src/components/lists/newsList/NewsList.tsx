import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../context/storeContext';
import { News } from '../../../core/types/News';
import { NewsCard } from '../../cards/newsCard/NewsCard';
import styles from './NewsList.module.scss';

const NewsList = observer(() => {
  const newsStore = useStore('NewsStore');

  return (
    <div className={styles.newsList}>
      {newsStore.sortedNews.map((news: News) => (
        <NewsCard news={news} key={news.id} />
      ))}
    </div>
  );
});

export default NewsList;
