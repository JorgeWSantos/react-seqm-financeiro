import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './authContext';
import { removeToken, getToken, setToken } from '@src/services/auth';
import type { LoggedUser } from '@abqm-ds/react';
import { useGeneralService } from '@src/services/useGeneralService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [tokenContext, setTokenContext] = useState<string | null>(getToken());

  const { getPersonData } = useGeneralService();

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
      const { data, success } = await getPersonData();

      if (success) {
        setUser(data.dados_pessoa);
        return '';
      } else {
        logout();
        return null;
      }
    } catch {
      logout();
      return null;
    }
  }, [logout, getPersonData]);

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
