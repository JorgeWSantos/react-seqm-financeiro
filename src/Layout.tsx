import {
  ContainerDesktop,
  ContainerMobile,
  GlobalContainer,
  HeaderMobile,
  SideBarDesktop,
  useDeviceType,
  type FooterWithButtonsPropsType,
  type MenuType,
} from '@abqm-ds/react';
import { useAuth } from './contexts/auth/useAuth.ts';
// import type { MenuResponseObj } from './types.ts';
import { useEffect, useState } from 'react';
import { useMenuService } from './services/useMenuService.ts';

function Layout({
  children,
  footerButtonsMobile,
}: {
  children?: React.ReactNode;
  footerButtonsMobile?: FooterWithButtonsPropsType;
}) {
  const { isTabletOrMobile } = useDeviceType();
  const { user, logout, token } = useAuth();
  const { getMenu } = useMenuService();

  const [menu] = useState<MenuType>([]);
  const pageTitle = 'Resultados';

  useEffect(() => {
    // TODO definir em que API vai ficar o menu
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
    <GlobalContainer footerButtonsMobile={footerButtonsMobile}>
      {/* Desktop */}
      <ContainerDesktop style={{ display: isTabletOrMobile ? 'none' : 'grid' }}>
        <SideBarDesktop
          user={user || null}
          menu={menu}
          onLogout={logout}
          onLogin={redirectToLogin}
          token={token || ''}
        />
        {children}
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
        {children}
      </ContainerMobile>
    </GlobalContainer>
  );
}

export default Layout;
