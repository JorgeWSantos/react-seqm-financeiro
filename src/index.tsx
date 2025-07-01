// import { StrictMode } from 'react';
import { AppRoutes } from './routes/index.tsx';
import { BrowserRouter } from 'react-router-dom';

import {
  ContainerDesktop,
  ContainerMobile,
  GlobalContainer,
  HeaderMobile,
  SideBarDesktop,
  useDeviceType,
  type MenuType,
} from '@abqm-ds/react';
import { useAuth } from './contexts/auth/useAuth.ts';
import type { MenuResponseObj } from './types.ts';
import { useEffect, useState } from 'react';
import { useMenuService } from './services/useMenuService.ts';

function MainApp() {
  const { isTabletOrMobile } = useDeviceType();
  const { user, logout, token } = useAuth();
  const { getMenu } = useMenuService();

  const [menu, setMenu] = useState<MenuType>([]);
  const pageTitle = 'chumbado';

  useEffect(() => {
    console.warn('TODO definir em que API vai ficar o menu:');

    const loadMenu = async () => {
      const menu: MenuResponseObj = await getMenu();

      setMenu(menu.list_menu);
    };
    loadMenu();
  }, [getMenu]);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  return (
    <BrowserRouter>
      <GlobalContainer>
        {!isTabletOrMobile ? (
          <ContainerDesktop>
            <SideBarDesktop
              user={user || null}
              menu={menu}
              onLogout={logout}
              onLogin={() =>
                (window.location.href =
                  import.meta.env.VITE_URL_LOGIN + '?path=/resultados')
              }
              token={token || ''}
            />

            <AppRoutes />
          </ContainerDesktop>
        ) : (
          <ContainerMobile>
            <HeaderMobile
              title="SEQM"
              page={pageTitle}
              data={menu}
              token={token || ''}
              userDropdown={{
                userName: user?.nome_pessoa || '',
                srcImage: user?.foto || '',
                onLogin: () => {
                  window.location.href =
                    import.meta.env.VITE_URL_LOGIN + '?path=/resultados';
                },
                onLogout: () => {
                  logout();
                },
              }}
            />

            <AppRoutes />
          </ContainerMobile>
        )}
      </GlobalContainer>
    </BrowserRouter>
  );
}

export default MainApp;
