import React, { useState, useEffect } from 'react'
import { ProfileInfo } from '../../profileInfo/ProfileInfo'
import Button from '../../ui/button/Button'
import { Meetup } from '../../../core/types/Meetup'
import { User } from '../../../core/types/User'
import styles from './PreviewTheme.module.scss'

interface PreviewThemeProps {
    meetup: Meetup
    onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onDelete: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onApprove: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const PreviewTheme = (props: PreviewThemeProps): JSX.Element => {
	const [allVotedUsers, setAllVotedUsets] = useState<User[]>([])

    const loadAllVotedUsers = async () => {
        setAllVotedUsets([
            {
                id: 'aaa-aaa',
                name: 'Leanne',
                surname: 'Graham',
                post: 'Developer',
                roles: 'CHIEF'
            }
        ])
    }

    useEffect((): void => {
        loadAllVotedUsers()
    }, [])

    return (
        <article>
            <h5 className={styles.caption}>Название</h5>
            <div className={styles.title}>
                <h2>{props.meetup.subject}</h2>
            </div>
            <h5 className={styles.caption}>Автор</h5>
            <div className={styles.author}>
                <ProfileInfo user={props.meetup.author} first="avatar" avatarHeightPX={40} />
            </div>
            <h5 className={styles.caption}>Описание</h5>
            <div className={styles.excerpt}>
                <p>{props.meetup.excerpt}</p>
            </div>
			<h5 className={styles.caption}>Поддерживают</h5>
			<div className={styles.votedUsers}>
				{allVotedUsers.slice(0, 7).map((user) => (
					<div className={styles.customUserAvatar}>
						{user.name[0]}
						{user.surname[0]}
					</div>
				))}
			</div>
            <div className={styles.buttons}>
                <Button type="default" text="Назад" callback={(event) => props.onCancel(event)} />
                <div>
					<Button className={styles.deleteButton} type="secondary" text="Удалить" callback={(event) => props.onDelete(event)} />
					<Button type="primary" text="Одобрить тему" callback={(event) => props.onApprove(event)} />
				</div>
            </div>
        </article>
    )
}
