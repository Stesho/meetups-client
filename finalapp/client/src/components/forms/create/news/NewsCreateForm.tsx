import React, { useState } from 'react';
import styles from './NewsCreateForm.module.scss'
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';

interface NewsCreateFormProps {
    onCancel: () => void
    onSubmit: () => void
} 

const NewsCreateForm = (props: NewsCreateFormProps) => {
    const [header, setHeader] = useState<string>(null!)
    const [text, setText] = useState<string>(null!)
    const [image, setImage] = useState<string | null>('')

    return (
        <form className={styles.form}>
            <div className={styles.inputs}>
                <LabeledInput
                    onChange={setHeader}
                    label="Заголовок"
                />
                <TextArea
                    onChange={(event) => setText(event.target.value)}
                    name="Текст"
                    maxLength={500}
                />
                <ImageLoader onLoadCallback={(newImage) => setImage(newImage)} />
            </div>
            <div className={styles.buttons}>
                <Button callback={props.onCancel} type="default" text="Назад" />
                <Button
                    callback={(event) => {}}
                    type="primary"
                    text="Создать"
                    // disabled={!checkForm()}
                />
            </div>
        </form>
    );
};

export default NewsCreateForm;