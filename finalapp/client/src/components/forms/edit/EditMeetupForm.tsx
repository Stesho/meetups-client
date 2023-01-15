import React, { useState } from 'react'
import { LabeledInput } from '../../ui/labeledInput/LabeledInput'
import { TextArea } from '../../ui/textArea/TextArea'
import { DateInput } from '../../ui/dateInput/DateInput'
import { Meetup } from '../../../core/types/Meetup'
import Button from '../../ui/button/Button'
import defaultMeetupImg from '../../../assets/images/default-meetup-img.png'
import styles from './EditMeetupForm.module.scss'

export type MeetupData = Pick<Meetup, 'image' | 'start' | 'finish' | 'subject' | 'place' | 'author' | 'excerpt'>

interface EditMeetupFormProps extends MeetupData {
    onCancel: () => void
    onSave: (data: MeetupData, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onPreview: () => void
}

export const EditMeetupForm = (props: EditMeetupFormProps): JSX.Element => {
    const [subject, setTheme] = useState<string>(props.subject)
    const [start, setStart] = useState<string>(props.start || '')
    const [finish, setEnd] = useState<string>(props.finish || '')
    const [place, setPlace] = useState<string>(props.place || '')
    const [author, setSpeaker] = useState<string>(`${props.author.name} ${props.author.surname}`)
    const [excerpt, setDescription] = useState<string>(props.excerpt)

    const image = props.image || defaultMeetupImg

    const parseAuthor = (author: string) => {
        return author.split(' ')
    }

    const getData = (): MeetupData => {
        const [name, surname] = parseAuthor(author)

        return {
            image,
            start,
            finish,
            subject,
            place,
            author: {
                id: props.author.id,
                name,
                surname
            },
            excerpt
        }
    }

    const preventDefaultSubmit = (event: React.FormEvent): void => event.preventDefault()

    return (
        <form className={styles.form} onSubmit={preventDefaultSubmit}>
            <div className={styles.inputs}>
                <div className={styles.photo}>
                    <span className={styles.caption}>Фото</span>
                    <div className={styles.imgWrapper}>
                        <img src={image} className={styles.img} alt="#" />
                    </div>
                </div>
                <div className={styles.theme}>
                    <LabeledInput onChange={setTheme} initialValue={subject} label="Тема" />
                </div>
                <div className={styles.dates}>
                    <DateInput id={'start'} setValue={setStart} value={start} className={styles.date} label="Начало" />
                    <DateInput id={'finish'} setValue={setEnd} value={finish} className={styles.date} label="Окончание" />
                </div>
                <div className={styles.place}>
                    <LabeledInput onChange={setPlace} initialValue={place} label="Место" />
                </div>
                <div className={styles.speaker}>
                    <LabeledInput onChange={setSpeaker} initialValue={author} label="Спикер" />
                </div>
                <div className={styles.description}>
                    <TextArea
                        onChange={(event) => setDescription(event.target.value)}
                        initialValue={excerpt}
                        className={styles.textarea}
                        name="Описание"
                    />
                </div>
            </div>
            <div className={styles.buttons}>
                <Button callback={props.onCancel} type="default" text="Отмена" />
                <div>
                    <Button className={styles.previewButton} callback={props.onPreview} type="secondary" text="Предпросмотр" />
                    <Button callback={(event) => props.onSave(getData(), event)} type="primary" text="Сохранить" />
                </div>
            </div>
        </form>
    )
}
