import React, { useState } from 'react'
import { Meetup } from '../../../core/types/Meetup'
import styles from './MeetupsList.module.scss'
import { MeetupCard } from '../../cards/meetupCard/MeetupCard'
import Button from '../../ui/button/Button'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useStore } from '../../../context/storeContext'
import Modal from '../../modal/Modal'

interface MeetupsListProps {
    meetups: Array<Meetup>
    status: 'REQUEST' | 'DRAFT' | 'CONFIRMED' // for filtering in different tabs
}

export const MeetupsList = (props: MeetupsListProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const meetupsStores = useStore('MeetupsStore')
    const [isActiveModal, setIsActiveModal] = useState<boolean>(false)
    const [deleteMeetupId, setDeleteMeetupId] = useState<string>(null!)
    const [deleteMeetupSubject, setDeleteMeetupSubject] = useState<string>(null!)

    const goToCreateMeetupPage = (): void => navigate('/create-meetup')

    const removeMeetupButtonClick = (meetup: Meetup): void => {
        setDeleteMeetupId(meetup.id)
        setDeleteMeetupSubject(meetup.subject)
        setIsActiveModal(true)
    }

    const editMeetupButtonClick = (meetup: Meetup): void => {
        navigate(`/edit-meetup/${meetup.id}`)
    }

    const onConfirmDelete = (meetupId: string) => {
        meetupsStores.deleteMeetupById(meetupId)
        setIsActiveModal(false)
    }

    const onCancelDelete = () => {
        setIsActiveModal(false)
    }

    return (
        <div className={styles.listContainer}>
            <Modal isActive={isActiveModal} onClose={() => setIsActiveModal(false)}>
                <span className={styles.modalCaption}>Вы хотите удалить митап?</span>
                <span className={styles.meetupSubject}>{deleteMeetupSubject}</span>
                <div className={styles.modalButtons}>
                    <Button callback={() => onCancelDelete()} text="Нет" type='secondary' className={styles.modalCancelBtn}/>
                    <Button callback={() => onConfirmDelete(deleteMeetupId)} text="Да" type='primary' className={styles.modalConfirmBtn}/>
                </div>
            </Modal>
            <div className={styles.row}>
                <span className={styles.suggested}>{props.meetups.length} тем предложено</span>
                <Button type="secondary" callback={goToCreateMeetupPage} text="+ Создать митап" />
            </div>
            <div className={styles.meetups}>
                {props.meetups.map(
                    (meetup: Meetup): JSX.Element => (
                        <MeetupCard
                            type={props.status === 'REQUEST' ? 'basic' : 'moderation'}
                            onMeetupDelete={removeMeetupButtonClick}
                            meetup={meetup}
                            key={meetup.id}  
                            onMeetupEdit={props.status === 'DRAFT' ? editMeetupButtonClick : undefined}
                        />
                    )
                )}
            </div>
        </div>
    )
}
