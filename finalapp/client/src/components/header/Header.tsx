import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/Logo_SaM.svg'
import Button from '../ui/button/Button'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ProfileInfo } from '../profileInfo/ProfileInfo'
import { ShortUser } from '../../core/types/User'
import { observer } from 'mobx-react-lite'

export interface HeaderProps {
    user: ShortUser
}

export const Header = observer(({ user }: HeaderProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()

    const toAuthorizePage = () => {
        navigate('/authorize')
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img className={styles.logo} src={logo} alt="SaM Solutions logo" />
                <nav className={styles.navigation}>
                    <NavLink
                        to="/meetups"
                        className={(active) => `${styles.navItem} ${active.isActive && styles.activeLink}`}
                    >
                        Митапы
                    </NavLink>
                    <NavLink to="/news" className={(active) => `${styles.navItem} ${active.isActive && styles.activeLink}`}>
                        Новости
                    </NavLink>
                </nav>
                {user !== null ? (
                    <ProfileInfo
                        user={user}
                        first="name"
                        avatarHeightPX={40}
                        text={{ fontWeight: '400', fontSize: '16px', color: '#FFF' }}
                    />
                ) : (
                    <Button callback={toAuthorizePage} type='default' text='Войти' />
                )}
            </div>
        </header>
    )
})
