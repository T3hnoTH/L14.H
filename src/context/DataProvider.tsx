import React, { useState, useEffect, type ReactNode } from 'react';
import { DataContext } from './DataContext';
import type { User, AuthUser } from '../types/User';

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Ошибка при загрузке пользователей');
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      const authData: AuthUser = { id: user.id, name: user.name, email: user.email };
      setCurrentUser(authData);
      localStorage.setItem('currentUser', JSON.stringify(authData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Не удалось обновить данные на сервере');

      const data = await response.json();
      setUsers((prev) => prev.map((u) => (u.id === data.id ? data : u)));

      if (currentUser && currentUser.id === data.id) {
        const updatedAuth = { id: data.id, name: data.name, email: data.email };
        setCurrentUser(updatedAuth);
        localStorage.setItem('currentUser', JSON.stringify(updatedAuth));
      }
    } catch (err: any) {
      alert(`Ошибка обновления: ${err.message}`);
    }
  };

  const getUserById = (id: number) => {
    return users.find((u) => u.id === id);
  };

  return (
    <DataContext.Provider
      value={{
        currentUser,
        users,
        loading,
        error,
        login,
        logout,
        updateUser,
        getUserById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};