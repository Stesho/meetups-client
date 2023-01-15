import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/Logo_SaM.svg'
import { NavLink } from 'react-router-dom'
import { ProfileInfo } from '../profileInfo/ProfileInfo'
import { ShortUser } from '../../core/types/User'

export interface HeaderProps {
    user?: ShortUser
}

export const Header = ({ user }: HeaderProps): JSX.Element => {
    return (
        <header className={styles.header}>
            {user ? (
                <div className={styles.headerContainer}>
                    <img className={styles.logo} src={logo} alt="SaM logo" />
                    <nav className={styles.navigation}>
                        <NavLink
                            to="/meetups"
                            className={(active) => `${styles.navItem} ${active.isActive && styles.activeLink}`}>
                            Митапы
                        </NavLink>
                        <NavLink to="/news" className={(active) => `${styles.navItem} ${active.isActive && styles.activeLink}`}>
                            Новости
                        </NavLink>
                    </nav>
                    <ProfileInfo
                        user={user}
                        first="name"
                        avatarHeightPX={40}
                        text={{ fontWeight: '400', fontSize: '16px', color: '#FFF' }}
                    />
                </div>
            ) : (
                <div className={styles.headerContainer}>
                    <img className={styles.logo} src={logo} alt="SaM logo" />
                </div>
            )}
        </header>
    )
}
