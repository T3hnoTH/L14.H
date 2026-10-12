import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataProvider';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { UsersListPage } from './pages/UsersListPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';

export const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} />
              <Route path="/profile/:id/edit" element={<EditProfilePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;