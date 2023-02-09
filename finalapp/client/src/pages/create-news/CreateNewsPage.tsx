import React from 'react';
import styles from './CreateNewsPage.module.scss'
import { useStore } from '../../context/storeContext';
import { CreatedNews, News } from '../../core/types/News';
import { NavigateFunction, useNavigate } from 'react-router';
import NewsCreateForm from '../../components/forms/create/news/NewsCreateForm';

// TODO: ADD VALIDATION
const CreateNewsPage = () => {
    const newsStore = useStore('NewsStore')
    const navigation: NavigateFunction = useNavigate()

    const toNewsPage = () => {
        navigation('/news')
    }

    const createNews = (news: CreatedNews, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event?.preventDefault()
        newsStore.addNews(news as News)
        toNewsPage()
    }

    return (
        <section className="container smoothPage">
            <div className={styles.createNewsPage}>
                <div className={styles.title}>
                    <h1 className="basicH1">Создание Новости</h1>
                </div>
                <NewsCreateForm onCancel={toNewsPage} onSubmit={createNews}/>
            </div>
        </section>
    )
};

export default CreateNewsPage;