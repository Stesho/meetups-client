import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MeetupsPage from './pages/meetups/MeetupsPage'
import NewsPage from './pages/news/NewsPage'
import { Header } from './components/header/Header'
import { CreateMeetupPage } from './pages/create-meetup/CreateMeetupPage'
import { AuthorizationPage } from './pages/authorization/AuthorizationPage'
import { ShortUser } from './core/types/User'
import { EditMeetupPage } from './pages/edit-meetup/EditMeetupPage'
import ThemePreviewPage from './pages/preview/ThemePreviewPage/ThemePreviewPage'
import MeetupPreviewPage from './pages/preview/MeetupPreviewPage/MeetupPreviewPage'
import CreateNewsPage from './pages/create-news/CreateNewsPage'
import NotificationBanner from './components/notificationBanner/NotificationBanner'
import NewsPreviewPage from './pages/preview/NewsPreviewPage/NewsPreviewPage'
import Modal from './components/confirmation/Confirmation'

export const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/meetups" />} />
                <Route path="/authorize" element={<AuthorizationPage />} />
                <Route path="/meetups" element={<MeetupsPage />} />
                <Route path="/create-meetup" element={<CreateMeetupPage user={testUser} />} />
                <Route path="/edit-meetup/:id" element={<EditMeetupPage />} />
                <Route path="/meetup-preview/:id" element={<MeetupPreviewPage />} />
                <Route path="/theme-preview/:id" element={<ThemePreviewPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news-preview/:id" element={<NewsPreviewPage />} />
                <Route path="/create-news" element={<CreateNewsPage />} />
            </Routes>
            <NotificationBanner />
            <Modal />
        </BrowserRouter>
    )
}

const testUser: ShortUser = { name: 'Alfred', surname: 'Lind', id: '1af86359-8e9d-41da-8da8-67e68ee514ea' }
