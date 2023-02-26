import React, { useEffect } from 'react';
import Button from '../../components/ui/button/Button';
import styles from './NewsPage.module.scss';
import NewsList from '../../components/lists/newsList/NewsList';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/storeContext';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import AvailableFor from '../../components/availableFor/AvailableFor';
import TranslatedMessage from '../../components/translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';

const NewsPage = observer((): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const newsStore = useStore('NewsStore');

  const toCreateNewsPage = () => {
    navigate('/news/create');
  };

  useEffect(() => {
    newsStore.fetchNews();
  }, [newsStore]);

  return (
    <section className="container smoothPage">
      <div className={styles.newsPage}>
        <div className={styles.title}>
          <h1 className="basicH1">
            <TranslatedMessage
              message={Translation.translatedText('news.title')}
            />
          </h1>
          <AvailableFor roles={['EMPLOYEE']}>
            <Button type="secondary" callback={toCreateNewsPage}>
              <TranslatedMessage
                message={Translation.translatedText('btn.createNews')}
              />
            </Button>
          </AvailableFor>
        </div>
        <NewsList news={newsStore.news} />
      </div>
    </section>
  );
});

export default NewsPage;
