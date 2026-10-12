import { createContext } from 'react';
import type { User, AuthUser } from '../types/User';

export interface DataContextType {
  currentUser: AuthUser | null;
  users: User[];
  loading: boolean;
  error: string | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => Promise<void>;
  getUserById: (id: number) => User | undefined;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);