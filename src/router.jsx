import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import LoadingScreen from './components/LoadingScreen';

// Lazy-loaded primary screens
const Splash = lazy(() => import('./pages/onboarding/Splash'));
const Authentication = lazy(() => import('./pages/account/Authentication'));
const Home = lazy(() => import('./pages/home/Home'));
const AamaalDashboard = lazy(() => import('./pages/aamaal/AamaalDashboard'));
const TasbihHome = lazy(() => import('./pages/tasbih/TasbihHome'));
const DuasHome = lazy(() => import('./pages/duas/DuasHome'));
const StoriesHome = lazy(() => import('./pages/stories/StoriesHome'));
const MasjidList = lazy(() => import('./pages/masjids/MasjidList'));
const FeelingCheckIn = lazy(() => import('./pages/reflections/FeelingCheckIn'));
const QuizHome = lazy(() => import('./pages/quiz/QuizHome'));
const SettingsHome = lazy(() => import('./pages/settings/SettingsHome'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// App Shell for screens that share the Header and Bottom Navigation
function MainLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="screen-container">
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </main>
      <BottomNavigation />
    </div>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/splash" replace /> },
  {
    path: '/splash',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Splash />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Authentication />
      </Suspense>
    ),
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/aamaal/*', element: <AamaalDashboard /> },
      { path: '/tasbih/*', element: <TasbihHome /> },
      { path: '/duas/*', element: <DuasHome /> },
      { path: '/stories/*', element: <StoriesHome /> },
      { path: '/masjids/*', element: <MasjidList /> },
      { path: '/feelings/*', element: <FeelingCheckIn /> },
      { path: '/quiz/*', element: <QuizHome /> },
      { path: '/settings/*', element: <SettingsHome /> },
      { path: '/admin/*', element: <AdminDashboard /> },
    ],
  },
]);