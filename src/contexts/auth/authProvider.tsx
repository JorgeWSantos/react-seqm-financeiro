import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './authContext';
import { getToken, setToken, cleanUserAndToken } from '@src/services/auth';
import type { LoggedUser } from '@abqm-ds/react';
import { useGlobalService } from '@src/services/Global/useGlobalService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [tokenContext, setTokenContext] = useState<string | null>(getToken());

  const { getPersonData } = useGlobalService();

  const logout = useCallback(({ path }: { path?: string }) => {
    cleanUserAndToken({ path });
    setUser(null);
    setTokenContext(null);
  }, []);

  const handleSetTokenContext = useCallback((token: string) => {
    setTokenContext(token);
    setToken(token);
  }, []);

  const login = useCallback(async () => {
    try {
      const { data, success } = await getPersonData();

      if (success) {
        setUser(data.dados_pessoa);
        return '';
      } else {
        logout({});
        return null;
      }
    } catch {
      logout({});
      return null;
    }
  }, [logout, getPersonData]);

  useQuery({
    queryKey: ['token', tokenContext],
    queryFn: login,
    enabled: !!tokenContext,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        isAuthenticated: !!user,
        handleSetTokenContext,
        token: tokenContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
