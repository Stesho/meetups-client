import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MeetupsPage from './pages/meetups/MeetupsPage';
import NewsPage from './pages/news/NewsPage';
import { Header } from './components/header/Header';
import { CreateMeetupPage } from './pages/create-meetup/CreateMeetupPage';
import { AuthorizationPage } from './pages/authorization/AuthorizationPage';
import { EditMeetupPage } from './pages/edit-meetup/EditMeetupPage';
import ThemePreviewPage from './pages/preview/ThemePreviewPage/ThemePreviewPage';
import MeetupPreviewPage from './pages/preview/MeetupPreviewPage/MeetupPreviewPage';
import CreateNewsPage from './pages/create-news/CreateNewsPage';
import NotificationBanner from './components/notificationBanner/NotificationBanner';
import NewsPreviewPage from './pages/preview/NewsPreviewPage/NewsPreviewPage';
import {
  Topics,
  Moderation,
  FutureMeetups,
  PastMeetups,
} from './components/lists/meetupsList/MeetupsList';
import Modal from './components/confirmation/Confirmation';
import { useStore } from './context/storeContext';
import { observer } from 'mobx-react-lite';
import EditNewsPage from './pages/edit-news/EditNewsPage';

export const App = observer((): JSX.Element => {
  const userStore = useStore('UserStore');

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={userStore.user} />
      <Routes>
        <Route path="/" element={<Navigate to="/meetups" />} />
        <Route path="authorize" element={<AuthorizationPage />} />
        <Route path="meetups" element={<Navigate to="/meetups/topics" />} />
        <Route path="meetups">
          <Route element={<MeetupsPage />}>
            <Route path="topics" element={<Topics />} />
            <Route path="moderation" element={<Moderation />} />
            <Route path="future" element={<FutureMeetups />} />
            <Route path="past" element={<PastMeetups />} />
          </Route>
          <Route path="create" element={<CreateMeetupPage />} />
          <Route path="edit/:id" element={<EditMeetupPage />} />
          <Route path="preview/:id" element={<MeetupPreviewPage />} />
          <Route path="theme-preview/:id" element={<ThemePreviewPage />} />
        </Route>
        <Route path="news">
          <Route index element={<NewsPage />} />
          <Route path="create" element={<CreateNewsPage />} />
          <Route path="edit/:id" element={<EditNewsPage />} />
          <Route path="preview/:id" element={<NewsPreviewPage />} />
        </Route>
        <Route path="*" element={'NOT FOUND'} />
      </Routes>
      <NotificationBanner />
      <Modal />
    </BrowserRouter>
  );
});
