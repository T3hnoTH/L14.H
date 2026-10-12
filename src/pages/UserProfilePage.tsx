import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataContext } from '../hooks/useDataContext';

export const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, currentUser } = useDataContext();

  const user = getUserById(Number(id));

  if (!user) return <div>Пользователь не найден</div>;

  const isCurrentAuthUser = currentUser?.id === user.id;

  return (
    <div>
      <h2>Профиль пользователя: {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username || 'Н/Д'}</p>
      <p><strong>Телефон:</strong> {user.phone || 'Н/Д'}</p>
      <p><strong>Веб-сайт:</strong> {user.website || 'Н/Д'}</p>
      
      {isCurrentAuthUser && (
        <Link to={`/profile/${user.id}/edit`}>
          <button style={{ marginTop: '10px', padding: '8px 16px' }}>Редактировать профиль</button>
        </Link>
      )}
    </div>
  );
};