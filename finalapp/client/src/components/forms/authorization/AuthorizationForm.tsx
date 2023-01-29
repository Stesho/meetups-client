import styles from './AuthorizationForm.module.scss'
import React from 'react'
import Button from '../../ui/button/Button'
import { LabeledInput } from '../../ui/labeledInput/LabeledInput'
import { AuthorizationRequestData } from '../../../core/types/AuthorizationRequestData'

interface AuthorizationFormProps {
    onSubmit: (data: AuthorizationRequestData) => void
}

export const AuthorizationForm = (props: AuthorizationFormProps): JSX.Element => {
    const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault()

    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const onAuthorizeButtonClick = (): void => props.onSubmit({ username: username, password: password })

    return (
        <form className={styles.form} onSubmit={preventDefaultSubmit} action="#">
            <LabeledInput
                label="Имя пользователя"
                onChange={setUsername}
                type="text"
                placeholder="Albert Richards"
                className={styles.input}
            />
            <LabeledInput label="Пароль" onChange={setPassword} type="password" className={styles.input} />
            <Button text="Вход" type="primary" callback={onAuthorizeButtonClick} />
        </form>
    )
}
