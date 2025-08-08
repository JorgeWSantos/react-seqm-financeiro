import {
  ContainerDesktop,
  ContainerMobile,
  GlobalContainer,
  HeaderMobile,
  SideBarDesktop,
  useDeviceType,
} from '@abqm-ds/react';
import { useAuth } from './contexts/auth/useAuth.ts';
import { useMenu } from './contexts/menu/useMenu.ts';

function Layout({ children }: { children?: React.ReactNode }) {
  const { isTabletOrMobile } = useDeviceType();
  const { user, logout, token } = useAuth();
  const { menu } = useMenu();

  const pageTitle = 'Resultados';

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
