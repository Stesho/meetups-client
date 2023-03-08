import React, { useEffect } from 'react';
import TranslatedMessage from '../../components/translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';
import EditNewsForm from '../../components/forms/edit/news/EditNewsForm';
import { useParams } from 'react-router-dom';
import { useStore } from '../../context/storeContext';
import { News } from '../../core/types/News';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import styles from './EditNewsPage.module.scss';
import { observer } from 'mobx-react-lite';

const EditNewsPage = observer(() => {
  const [news, setNews] = React.useState<News | null>(null);
  const newsStore = useStore('NewsStore');
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  if(!id) {
    navigate('/news');
  }

  const getNews = async () => {
    if(id) {
      const recievedNews = await newsStore.getNewsById(id);
      setNews(recievedNews);
    }
  }

  const toPreviewPage = () => {
    navigate(`/news/preview/${id}`);
  }

  const onCancel = () => {
    toPreviewPage();
  }

  const onSave = async (editedNews: News) => {
    navigate(`/news`);
    await newsStore.editNews(editedNews);
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <section className="container smoothPage">
      {news && (
        <div className={styles.newsPage}>
          <div className={styles.title}>
            <h1 className="basicH1">
              <TranslatedMessage
                message={Translation.translatedText('news.edit.title')}
              />
            </h1>
          </div>
          <EditNewsForm
            news={news}
            onCancel={onCancel}
            onSave={onSave}
          />
        </div>
      )}
    </section>
  );
});

export default EditNewsPage;