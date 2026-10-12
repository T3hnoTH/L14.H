export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}