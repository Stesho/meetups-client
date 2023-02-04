import styles from './AuthorizationForm.module.scss'
import React, { useState } from 'react'
import Button from '../../ui/button/Button'
import { LabeledInput } from '../../ui/labeledInput/LabeledInput'
import { AuthorizationRequestData } from '../../../core/types/AuthorizationRequestData'
import { useInput } from '../../../core/hooks/useInput'
import { checkMinLength, checkMaxLength } from '../../../core/utils/inputValidation'

interface AuthorizationFormProps {
    onSubmit: (data: AuthorizationRequestData) => void
}

const minInputLength = 1
const maxInputLength = 100

const validationOptions = {
    minLength: checkMinLength(minInputLength),
    maxLength: checkMaxLength(maxInputLength)
}

const errorMessages = {
    minLength: 'Поле не может быть пустым',
    maxLength: 'Поле слишком длинное'
}

export const AuthorizationForm = (props: AuthorizationFormProps): JSX.Element => {
    const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault()

    const username = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const password = useInput<typeof validationOptions>(validationOptions, errorMessages)

    const onAuthorizeButtonClick = (): void => props.onSubmit({
        username: username.value,
        password: password.value
    })

    const checkForm = (): boolean => [username, password].every((input) => input.isValid)

    return (
        <form className={styles.form} onSubmit={preventDefaultSubmit} action="#">
            <LabeledInput
                onChange={username.setValue}
                onBlur={() => username.setIsOnBlur(true)}
                type="text"
                label="Имя пользователя"
                placeholder="Albert Richards"
                className={styles.input}
                status={username.status}
                helpText={username.message}
            />
            <LabeledInput
                onChange={password.setValue}
                onBlur={() => password.setIsOnBlur(true)}
                type="password"
                label="Пароль"
                className={styles.input}
                status={password.status}
                helpText={password.message}
            />
            <Button
                text="Вход"
                type="primary"
                callback={onAuthorizeButtonClick}
                disabled={!checkForm()}
                className={styles.button}
            />
        </form>
    )
}
