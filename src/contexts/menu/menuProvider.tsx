import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MenuContext } from './menuContext';
import {
  useGlobalService,
  type MenuResponseObj,
} from '@src/services/Global/useGlobalService';

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const { getMenu } = useGlobalService();

  const onGetMenu = useCallback(async () => {
    const menu: MenuResponseObj = await getMenu();
    return menu.list_menu;
  }, [getMenu]);

  const { data: menu } = useQuery({
    queryKey: ['menu'],
    queryFn: onGetMenu,
  });

  return (
    <MenuContext.Provider
      value={{
        menu: menu ?? [],
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
