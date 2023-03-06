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
import PrivateRoute from './core/utils/privateRoute';
import Loader from './components/ui/loader/Loader';
import styles from './App.module.scss';

export const App = observer((): JSX.Element => {
  const userStore = useStore('UserStore');

  const fetchUser = () => {
    return new Promise<void>(async (resolve) => {
      await userStore.fetchUser();
      resolve();
    })
  }

  return (
    <Loader
      promise={fetchUser()}
      loaderClassName={styles.loader}
      spinnerClassName={styles.spinner}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/meetups" />} />
          <Route path="authorize" element={<AuthorizationPage />} />
          <Route path="meetups" element={<Navigate to="/meetups/topics" />} />
          <Route path="meetups">
            <Route element={<MeetupsPage />}>
              <Route path="topics" element={<Topics />} />
              <Route path="moderation" element={
                <PrivateRoute roles={['CHIEF', 'EMPLOYEE']}>
                  <Moderation />
                </PrivateRoute>
              } />
              <Route path="future" element={<FutureMeetups />} />
              <Route path="past" element={<PastMeetups />} />
            </Route>
            <Route path="create" element={
              <PrivateRoute roles={['CHIEF', 'EMPLOYEE']}>
                <CreateMeetupPage />
              </PrivateRoute>
            } />
            <Route path="edit/:id" element={
              <PrivateRoute roles={['CHIEF']}>
                <EditMeetupPage />
              </PrivateRoute>
            } />
            <Route path="preview/:id" element={<MeetupPreviewPage />} />
            <Route path="theme-preview/:id" element={<ThemePreviewPage />} />
          </Route>
          <Route path="news">
            <Route index element={<NewsPage />} />
            <Route path="create" element={
              <PrivateRoute roles={['CHIEF']}>
                <CreateNewsPage />
              </PrivateRoute>
            } />
            <Route path="edit/:id" element={
              <PrivateRoute roles={['CHIEF']}>
                <EditNewsPage />
              </PrivateRoute>
            } />
            <Route path="preview/:id" element={<NewsPreviewPage />} />
          </Route>
          <Route path="*" element={'NOT FOUND'} />
        </Routes>
        <NotificationBanner />
        <Modal />
      </BrowserRouter>
    </Loader>
  );
});
