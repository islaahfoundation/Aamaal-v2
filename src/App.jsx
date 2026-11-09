import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { router } from './router';

export default function App() {
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  );
}