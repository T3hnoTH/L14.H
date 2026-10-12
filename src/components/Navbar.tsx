import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDataContext } from '../hooks/useDataContext';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useDataContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
      <Link to="/users">Пользователи</Link>
      {currentUser ? (
        <>
          <Link to={`/profile/${currentUser.id}`}>Мой профиль</Link>
          <span style={{ marginLeft: 'auto' }}>
            Привет, <strong>{currentUser.name}</strong>
          </span>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <Link to="/login" style={{ marginLeft: 'auto' }}>Войти</Link>
      )}
    </nav>
  );
};