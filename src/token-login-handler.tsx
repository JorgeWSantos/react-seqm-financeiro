import { useEffect } from 'react';
import { useAuth } from '@contexts/auth/useAuth';
import { getToken } from './services/auth';

export function TokenLoginHandler({ path }: { path: string }) {
  const { loginWithToken, logout } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenQuery = params.get('tk');
    const tokenLocalStorage = getToken();

    const tokenToUse = tokenQuery || tokenLocalStorage;

    if (tokenToUse) {
      loginWithToken(tokenToUse);
    } else {
      logout({ path });
    }

    // remove token from query
    // if (tokenQuery) {
    //   params.delete('tk');

    //   const newUrl =
    //     window.location.pathname +
    //     (params.toString() ? '?' + params.toString() : '') +
    //     window.location.hash;

    //   window.history.replaceState({}, '', newUrl);
    // }
  }, [loginWithToken, logout, path]);

  return null;
}
