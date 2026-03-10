import React from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDom from 'react-dom/client';
import AppProviders from './context/AppProviders';
import HomePage from "./Pages/HomePage.jsx";
import VideoDetailPage from './Pages/VideoDetailPage.jsx'
import ChannelSubscribedListPage from './Pages/ChannelPages/ChannelSubscribedListPage.jsx';
import ChannelVideoListPage from './Pages/ChannelPages/ChannelVideoListPage.jsx';
import ChannelPlaylistListPage from './Pages/ChannelPages/ChannelPlaylistListPage.jsx';
import ChannelPlaylistVideoListPage from './Pages/ChannelPages/ChannelPlaylistVideoListPage.jsx';
import ChannelTweetsListPage from './Pages/ChannelPages/ChannelTweetsListPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import RegistrationPage from './Pages/RegistrationPage.jsx';
import UploadVideoPage from './Pages/UploadVideoPage.jsx';
import UploadingVideoModelPopup from './Pages/UploadingVideoModelPopup.jsx';
import EditPersonalDetailPage from './Pages/ChannelEditPages/EditPersonalDetailPage.jsx';
import EditChannelDetailPage from './Pages/ChannelEditPages/EditChannelDetailPage.jsx';
import EditPasswordPage from './Pages/ChannelEditPages/EditPasswordPage.jsx';
import EdminDashboardPage from './Pages/EdminDashboardPage.jsx';
import EditVideoDetailsPopup from './Pages/EditVideoDetailsPopup.jsx';
import DeleteVideoPopup from './Pages/DeleteVideoPopup.jsx';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage.jsx';
import TermsAndConditionPage from './Pages/TermsAndConditionPage.jsx';
import App from './App.jsx';
import UserProfile from './UserProfile.jsx';
import WatchHistoryPage from './Pages/WatchHistoryPage.jsx';
import LikedVideoPage from './Pages/LikedVideoPage.jsx';
import SupportPage from './Pages/SupportPage.jsx';
import MyPlaylistsPage from './Pages/MyPlaylistsPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/video/:videoId",
        element: (
          <ProtectedRoute>
            <VideoDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/userProfile/:userName",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "videos",
            element: <ChannelVideoListPage />,
          },
          {
            path: "playlist",
            element: <ChannelPlaylistListPage />,
          },
          {
            path: "playlist/:playlistId",
            element: <ChannelPlaylistVideoListPage />,
          },
          {
            path: "subscribed",
            element: <ChannelSubscribedListPage />,
          },
          {
            path: "tweet",
            element: <ChannelTweetsListPage />,
          },
        ],
      },
      {
        path: "/uploadvideo",
        element: (
          <ProtectedRoute>
            <UploadVideoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/uploadingvideo",
        element: (
          <ProtectedRoute>
            <UploadingVideoModelPopup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/personalInfoEdit",
        element: (
          <ProtectedRoute>
            <EditPersonalDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/channelInfoEdit",
        element: (
          <ProtectedRoute>
            <EditChannelDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editpassword",
        element: (
          <ProtectedRoute>
            <EditPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edmindashboard",
        element: (
          <ProtectedRoute>
            <EdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editevideodetails/:videoId",
        element: (
          <ProtectedRoute>
            <EditVideoDetailsPopup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deletevideo",
        element: (
          <ProtectedRoute>
            <DeleteVideoPopup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/termsandconditions",
        element: <TermsAndConditionPage />,
      },
      {
        path: "/user/history",
        element: (
          <ProtectedRoute>
            <WatchHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/likedvideo",
        element: (
          <ProtectedRoute>
            <LikedVideoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/support",
        element: (
          <ProtectedRoute>
            <SupportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myplaylists",
        element: (
          <ProtectedRoute>
            <MyPlaylistsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
