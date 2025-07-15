// import { StrictMode } from 'react';
// import { AppRoutes } from './routes/index.tsx';
// import { BrowserRouter } from 'react-router-dom';

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
import { Outlet } from 'react-router-dom';

function MainApp() {
  const { isTabletOrMobile } = useDeviceType();
  const { user, logout, token } = useAuth();
  const { getMenu } = useMenuService();

  const [menu, setMenu] = useState<MenuType>([]);
  const pageTitle = 'Resultados';

  useEffect(() => {
    console.warn('TODO definir em que API vai ficar o menu:');

    // const loadMenu = async () => {
    //   const menu: MenuResponseObj = await getMenu();

    //   setMenu(menu.list_menu);
    // };
    // loadMenu();
  }, [getMenu]);

  const redirectToLogin = () => {
    console.log('import.meta.env.VITE_URL_LOGIN', import.meta.env.VITE_URL_LOGIN);

    const url = import.meta.env.VITE_URL_LOGIN + '?path=/resultados';

    console.log('url', url);

    window.location.href = url;
  };

  return (
    <GlobalContainer>
      {/* Desktop */}
      <ContainerDesktop style={{ display: isTabletOrMobile ? 'none' : 'grid' }}>
        <SideBarDesktop
          user={user || null}
          menu={menu}
          onLogout={logout}
          onLogin={redirectToLogin}
          token={token || ''}
        />
        <Outlet />
      </ContainerDesktop>
      {/* Mobile */}
      <ContainerMobile style={{ display: isTabletOrMobile ? 'flex' : 'none' }}>
        <HeaderMobile
          title="SEQM"
          page={pageTitle}
          data={menu}
          token={token || ''}
          userDropdown={{
            userName: user?.nome_pessoa || '',
            srcImage: user?.foto || '',
            onLogin: redirectToLogin,
            onLogout: logout,
          }}
        />
        <Outlet />
      </ContainerMobile>
    </GlobalContainer>
  );
}

export default MainApp;
