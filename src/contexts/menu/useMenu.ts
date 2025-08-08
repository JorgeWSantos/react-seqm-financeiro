// src/menu/useMenu.ts
import { useContext } from 'react';
import { MenuContext } from './menuContext';

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within an MenuProvider');
  }

  return {
    ...context,
  };
};
