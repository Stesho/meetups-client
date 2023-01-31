import React, { useEffect } from 'react'
import Button from '../../components/ui/button/Button';
import styles from './NewsPage.module.scss'
import NewsList from '../../components/lists/newsList/NewsList';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/storeContext';
import { useNavigate, NavigateFunction } from 'react-router-dom';

const NewsPage = observer((): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const newsStore = useStore('NewsStore')

    const toCreateNewsPage = () => {
        navigate('/create-news')
    }

    useEffect(() => {
        newsStore.fetchNews()
    }, [newsStore])

    return (
        <section className="container smoothPage">
            <div className={styles.newsPage}>
                <div className={styles.title}>
                    <h1 className="basicH1">Новости</h1>
                    <Button type='secondary' text='+ Создать Новость' callback={toCreateNewsPage}/>
                </div>
                <NewsList news={newsStore.news}/>
            </div>
        </section>
    );
})

export default NewsPage
