import React, { useState } from 'react';
import styles from './NewsCreateForm.module.scss'
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import { CreatedNews } from '../../../../core/types/News';
import { useInput } from '../../../../core/hooks/useInput';
import { checkMinLength, checkMaxLength } from '../../../../core/utils/inputValidation';
import Button from '../../../ui/button/Button';

interface NewsCreateFormProps {
    onCancel: () => void
    onSubmit: (data: CreatedNews, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const minInputLength = 1
const maxInputLength = 100
const maxTextAreaLength = 500

const validationOptions = {
    minLength: checkMinLength(minInputLength),
    maxLength: checkMaxLength(maxInputLength)
}

const errorMessages = {
    minLength: 'Поле не может быть пустым',
    maxLength: 'Поле слишком длинное'
}

const NewsCreateForm = (props: NewsCreateFormProps) => {
    const title = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const text = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const [image, setImage] = useState<string | null>(null)

    const getData = (): CreatedNews => {
        return {
            title: title.value,
            text: text.value,
            image
        }
    }

    const submitForm = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        props.onSubmit(getData(), event)
    }

    const checkForm = (): boolean => [title, text].every(item => item.isValid)

    return (
        <form className={styles.form}>
            <div className={styles.inputs}>
                <LabeledInput
                    onChange={title.setValue}
                    onBlur={() => title.setIsOnBlur(true)}
                    status={title.status}
                    type="text"
                    label="Заголовок"
                    helpText={title.message}
                />
                <TextArea
                    onChange={(event) => text.setValue(event.target.value)}
                    onBlur={() => text.setIsOnBlur(true)}
                    status={text.status}
                    name="Текст"
                    maxLength={maxTextAreaLength}
                    helpText={text.message}
                />
                <ImageLoader onLoadCallback={(newImage) => setImage(newImage)} />
            </div>
            <div className={styles.buttons}>
                <Button callback={props.onCancel} type="default" text="Назад" />
                <Button
                    callback={submitForm}
                    type="primary"
                    text="Создать"
                    disabled={!checkForm()}
                />
            </div>
        </form>
    );
};

export default NewsCreateForm;