import { useAuth } from '@src/contexts/auth/useAuth';
import { TokenLoginHandler } from '@src/token-login-handler';

import type { ReactNode } from 'react';
interface PrivateRouteProps {
  children: ReactNode;
  path: string;
}

export function PrivateRoute({ children, path }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <TokenLoginHandler path={path} />
        {children}
      </>
    );
  }
  return children;
}
