import { AuthorizationForm } from '../../components/forms/authorization/AuthorizationForm'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { AuthorizationRequestData } from '../../core/types/AuthorizationRequestData'
import { tryAuthorize } from '../../core/utils/tryAuthorize'
import React from 'react'
import styles from './AuthorizationPage.module.scss'

export const AuthorizationPage = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()

    const onAuthorizationFormSend = async (data: AuthorizationRequestData): Promise<void> => {
        const response = await tryAuthorize(data)
        console.log(response)
    }

    return (
        <section className="container smoothPage">
            <div className={styles.authorizationPage}>
                <h1 className={`basicH1 ${styles.title}`}>Авторизация</h1>
                <p className={`paragraph ${styles.description}`}>
                    Войдите в систему, чтобы получить возможность предложения новых тем для митапов и многого другого.
                </p>
                <AuthorizationForm onSubmit={onAuthorizationFormSend} />
            </div>
        </section>
    )
}
