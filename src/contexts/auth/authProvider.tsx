import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { AuthContext } from './authContext';
import { removeToken, getToken, setToken } from '@src/services/auth';
import type { LoggedUser } from '@abqm-ds/react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [tokenContext, setTokenContext] = useState<string | null>(getToken());

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setTokenContext(null);
  }, []);

  const handleSetTokenContext = useCallback((token: string) => {
    setTokenContext(token);
    setToken(token);
  }, []);

  const fetchUserDatabyToken = useCallback(async () => {
    try {
      const { data } = await api.get('/pessoa/dadospessoa');

      if (data.success) {
        const _userData = data.data[0];
        setUser(_userData);
        return _userData;
      } else {
        logout();
        return null;
      }
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  useQuery({
    queryKey: ['token', tokenContext],
    queryFn: fetchUserDatabyToken,
    enabled: !!tokenContext,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        isAuthenticated: !!user,
        handleSetTokenContext,
        token: tokenContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
