import type { MenuType } from '@abqm-ds/react';
import { createContext } from 'react';

export interface MenuContextType {
  menu: MenuType | [];
}

export const MenuContext = createContext<MenuContextType>({} as MenuContextType);
