import { Meetup } from '../../../core/types/Meetup'
import styles from './MeetupsList.module.scss'
import React from 'react'
import { MeetupCard } from '../../cards/meetupCard/MeetupCard'
import Button from '../../ui/button/Button'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { removeMeetupFromServerById } from '../../../core/utils/removeMeetupFromServer'

interface MeetupsListProps {
    meetups: Array<Meetup>
    status: 'REQUEST' | 'DRAFT' | 'CONFIRMED' // for filtering in different tabs
}

export const MeetupsList = (props: MeetupsListProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()

    const goToCreateMeetupPage = (): void => navigate('/create-meetup')

    const removeMeetupButtonClick = async (meetup: Meetup): Promise<void> => {
        await removeMeetupFromServerById(meetup.id)
        window.location.reload()
    }

    const editMeetupButtonClick = (meetup: Meetup): void => {
        navigate(`/edit-meetup/${meetup.id}`)
    }

    const renderedData: Array<Meetup> = props.meetups.filter((meetup: Meetup): boolean => meetup.status === props.status)

    return (
        <div className={styles.listContainer}>
            <div className={styles.row}>
                <span className={styles.suggested}>{renderedData.length} тем предложено</span>
                <Button type="secondary" callback={goToCreateMeetupPage} text="+ Создать митап" />
            </div>
            <div className={styles.meetups}>
                {renderedData.map(
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
