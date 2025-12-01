import type { LoggedUser } from '@abqm-ds/react';
import { createContext } from 'react';

export interface AuthContextType {
  user: LoggedUser | null;
  logout: ({ path }: { path?: string }) => void;
  login: () => Promise<string | null>;
  isAuthenticated: boolean;
  handleSetTokenContext: (token: string) => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
