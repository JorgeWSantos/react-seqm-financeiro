import { useEffect } from 'react';
import { useAuth } from '@contexts/auth/useAuth';

export function TokenLoginHandler() {
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('tk');

    if (token) {
      loginWithToken(token);
      params.delete('tk');

      const newUrl =
        window.location.pathname +
        (params.toString() ? '?' + params.toString() : '') +
        window.location.hash;

      window.history.replaceState({}, '', newUrl);
    }
  }, [loginWithToken]);

  return null;
}
