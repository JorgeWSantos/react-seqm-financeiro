import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MenuContext } from './menuContext';
import { useGeneralService, type MenuResponseObj } from '@src/services/useGeneralService';
import type { MenuType } from '@abqm-ds/react';

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState<MenuType | []>([]);

  const { getMenu } = useGeneralService();

  const onGetMenu = useCallback(async () => {
    const loadMenu = async () => {
      const menu: MenuResponseObj = await getMenu();
      setMenu(menu.list_menu);
    };
    loadMenu();
  }, [getMenu]);

  useQuery({
    queryKey: ['menu'],
    queryFn: onGetMenu,
    // enabled: true,
  });

  return (
    <MenuContext.Provider
      value={{
        menu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
