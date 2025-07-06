// import { StrictMode } from 'react';
import { AppRoutes } from './routes/index.tsx';
import { BrowserRouter } from 'react-router-dom';

import {
  ContainerDesktop,
  ContainerMobile,
  ContentDektop,
  ContentMobile,
  GlobalContainer,
  Header,
  HeaderMobile,
  SideBarDesktop,
  useDeviceType,
  type MenuType,
} from '@abqm-ds/react';
import { useAuth } from './contexts/auth/useAuth.ts';
import type { MenuResponseObj } from './types.ts';
import { useEffect, useState } from 'react';
import { useMenuService } from './services/useMenuService.ts';
import { usePage } from './contexts/page/usePage.ts';

function MainApp() {
  const { isTabletOrMobile } = useDeviceType();
  const { user, logout, token } = useAuth();
  const { getMenu } = useMenuService();
  const { currentPage } = usePage();

  const [menu, setMenu] = useState<MenuType>([]);

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

  const redirectToLogin = () => {
    console.log('import.meta.env.VITE_URL_LOGIN', import.meta.env.VITE_URL_LOGIN);

    const url = import.meta.env.VITE_URL_LOGIN + '?path=/resultados';

    console.log('url', url);

    window.location.href = url;
  };

  return (
    <BrowserRouter>
      <GlobalContainer>
        {!isTabletOrMobile ? (
          <ContainerDesktop>
            <SideBarDesktop
              user={user || null}
              menu={menu}
              onLogout={logout}
              onLogin={redirectToLogin}
              token={token || ''}
            />

            <ContentDektop
              header={<Header text={currentPage.page_title} />}
              contentBoxStyles={{ padding: '1rem 0', gap: '0' }}
            >
              <AppRoutes />
            </ContentDektop>
          </ContainerDesktop>
        ) : (
          <ContainerMobile>
            <HeaderMobile
              title="SEQM"
              page={currentPage.page_title}
              data={menu}
              token={token || ''}
              userDropdown={{
                userName: user?.nome_pessoa || '',
                srcImage: user?.foto || '',
                onLogin: redirectToLogin,
                onLogout: () => {
                  logout();
                },
              }}
            />

            <ContentMobile>
              <AppRoutes />
            </ContentMobile>
          </ContainerMobile>
        )}
      </GlobalContainer>
    </BrowserRouter>
  );
}

export default MainApp;
