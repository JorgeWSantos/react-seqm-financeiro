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
import { Outlet } from 'react-router-dom';
import { ErrorElement } from './ErrorElements.tsx';

function Layout({ withError }: { withError?: boolean }) {
  const { isTabletOrMobile } = useDeviceType();
  const { user, logout, token } = useAuth();
  const { menu } = useMenu();

  const pageTitle = 'Resultados';

  const redirectToLogin = () => {
    const url = import.meta.env.VITE_URL_LOGIN + '?path=/resultados';

    window.location.href = url;
  };

  return (
    <GlobalContainer footerType="medium">
      {!isTabletOrMobile && (
        <ContainerDesktop style={{ display: isTabletOrMobile ? 'none' : 'grid' }}>
          <SideBarDesktop
            user={user || null}
            menu={menu || []}
            onLogout={logout}
            onLogin={redirectToLogin}
            token={token || ''}
          />
          {withError ? <ErrorElement /> : <Outlet />}
        </ContainerDesktop>
      )}

      {isTabletOrMobile && (
        <ContainerMobile style={{ display: isTabletOrMobile ? 'flex' : 'none' }}>
          <HeaderMobile
            title="SEQM"
            page={pageTitle}
            data={menu || []}
            token={token || ''}
            userDropdown={{
              userName: user?.nome_pessoa || '',
              srcImage: user?.foto || '',
              onLogin: redirectToLogin,
              onLogout: logout,
            }}
          />
          {withError ? <ErrorElement /> : <Outlet />}
        </ContainerMobile>
      )}
    </GlobalContainer>
  );
}

export default Layout;
