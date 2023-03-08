import React, { useState, useEffect } from 'react';
import styles from './NewsPreviewPage.module.scss';
import { useParams } from 'react-router-dom';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { News } from '../../../core/types/News';
import { useStore } from '../../../context/storeContext';
import NewsPreview from '../../../components/preview/newsPreview/NewsPreview';
import { FormattedMessage } from 'react-intl';

const NewsPreviewPage = () => {
  const [news, setNews] = useState<News | null>(null);
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const newsStore = useStore('NewsStore');

  const loadNews = async () => {
    if (id) {
      const receivedNews: News | null = await newsStore.getNewsById(id);
      setNews(receivedNews);
    }
  };

  const toNewsPage = () => {
    navigate(`/news`);
  };

  const toEditPage = () => {
    navigate(`/news/edit/${id}`);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <section className="container smoothPage">
      {news && (
        <div className={styles.previewPage}>
          <div className={styles.title}>
            <h1 className="basicH1">
              <FormattedMessage
                id="news.preview.title"
                defaultMessage="Просмотр Новости"
              />
            </h1>
          </div>
          <NewsPreview news={news} onCancel={toNewsPage} onEdit={toEditPage} />
        </div>
      )}
    </section>
  );
};

export default NewsPreviewPage;
