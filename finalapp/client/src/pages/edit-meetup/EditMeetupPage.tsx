import React, { useState, useEffect } from 'react'
import { EditMeetupForm } from '../../components/forms/edit/EditMeetupForm'
import { MeetupData } from '../../components/forms/edit/EditMeetupForm'
import { Meetup } from '../../core/types/Meetup'
import { ShortUser } from '../../core/types/User'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import styles from './EditMeetupPage.module.scss'
import { getMeetupFromServerById } from '../../core/utils/getMeetupFromServerById'
import { updateMeetupOnServer } from '../../core/utils/updateMeetupOnServer'

export const EditMeetupPage = () => {
    const [meetup, setMeetup] = useState<Meetup | null>(null)
    const navigate: NavigateFunction = useNavigate()

    const { id } = useParams()

    // todo: write function
    const onCancel = (): void => {
        navigate('/')
    }
    // todo: write function
    const onSave = async (data: MeetupData, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await updateMeetupOnServer({
            id: meetup!.id,
            subject: data.subject,
            place: data.place,
            excerpt: data.excerpt,
            image: data.image,
            speakers: meetup!.speakers,
            modified: new Date().toISOString(),
            isOver: meetup!.isOver,
            status: meetup!.status,
            start: data.start,
            finish: data.finish,
            goCount: meetup!.goCount,
            author: data.author
        })
        navigate('/meetups')
    }
    // todo: write function
    const onPreview = (): void => {}

    const loadMeetup = async () => {
        if (id) {
            const receivedMeetup: Meetup | null = await getMeetupFromServerById(id)
            setMeetup(receivedMeetup)
        }
    }

    useEffect(() => {
        loadMeetup()
    }, [])

    // todo: delete
    const shortUser: ShortUser = {
        id: '1',
        name: 'Name',
        surname: 'Surname'
    }

    return (
        <section className="container smoothPage">
            {meetup && (
                <div className={styles.editMeetupPage}>
                    <div className={styles.title}>
                        <h1 className="basicH1">Редактирование Митапа</h1>
                    </div>
                    <EditMeetupForm
                        image={meetup?.image || ''}
                        start={meetup?.start || ''}
                        finish={meetup?.finish || ''}
                        subject={meetup?.subject || ''}
                        author={meetup?.author || shortUser}
                        excerpt={meetup?.excerpt || ''}
                        place={meetup?.place || ''}
                        onCancel={onCancel}
                        onSave={onSave}
                        onPreview={onPreview}
                    />
                </div>
            )}
        </section>
    )
}
