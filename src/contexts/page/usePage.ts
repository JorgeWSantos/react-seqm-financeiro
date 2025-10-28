// src/auth/useAuth.ts
import { useContext } from 'react';
import { PageContext } from './pageContext';

export const usePage = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error('usePage must be used within an PageProvider');
  }

  return {
    ...context,
  };
};
