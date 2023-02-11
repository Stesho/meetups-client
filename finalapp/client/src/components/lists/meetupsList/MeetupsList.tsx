import React from 'react'
import { Meetup } from '../../../core/types/Meetup'
import styles from './MeetupsList.module.scss'
import { MeetupCard } from '../../cards/meetupCard/MeetupCard'
import Button from '../../ui/button/Button'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useStore } from '../../../context/storeContext'
import { observer } from 'mobx-react-lite'
import AvailableFor from '../../../core/utils/availableFor'

interface MeetupsListProps {
    meetups: Array<Meetup>
    status: 'REQUEST' | 'DRAFT' | 'CONFIRMED' // for filtering in different tabs
}

export const MeetupsList = observer((props: MeetupsListProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const meetupsStore = useStore('MeetupsStore')
    
    const goToCreateMeetupPage = (): void => navigate('/create-meetup')

    const removeMeetupButtonClick = (meetup: Meetup): void => {
        meetupsStore.deleteMeetup(meetup)
    }

    const editMeetupButtonClick = (meetup: Meetup): void => {
        navigate(`/edit-meetup/${meetup.id}`)
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.row}>
                <span className={styles.suggested}>{props.meetups.length} тем предложено</span>
                <AvailableFor roles={['CHIEF', 'EMPLOYEE']}>
                    <Button type="secondary" callback={goToCreateMeetupPage} text="+ Создать митап" />
                </AvailableFor>
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
})
