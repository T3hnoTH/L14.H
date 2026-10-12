import React from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from '../hooks/useDataContext';

export const UsersListPage: React.FC = () => {
  const { users, loading, error } = useDataContext();

  if (loading) return <div>Загрузка пользователей...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Список пользователей</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px', borderRadius: '4px' }}>
            <strong>{user.name}</strong> ({user.email})
            <div style={{ marginTop: '5px' }}>
              <Link to={`/profile/${user.id}`}>Просмотреть профиль</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};