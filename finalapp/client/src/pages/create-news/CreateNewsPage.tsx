import React from 'react';
import styles from './CreateNewsPage.module.scss'
import NewsCreateForm from '../../components/forms/create/news/NewsCreateForm';

const CreateNewsPage = () => {
    return (
        <section className="container smoothPage">
            <div className={styles.createNewsPage}>
                <div className={styles.title}>
                    <h1 className="basicH1">Создание Новости</h1>
                </div>
                <NewsCreateForm onCancel={() => {}} onSubmit={() => {}}/>
            </div>
        </section>
    )
};

export default CreateNewsPage;