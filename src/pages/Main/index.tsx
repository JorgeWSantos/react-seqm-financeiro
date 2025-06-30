import {
  ActivityIndicator,
  ContainerDesktop,
  ContainerMobile,
  ContentDektop,
  ContentMobile,
  GlobalContainer,
  Header,
  HeaderMobile,
  HeaderMobileNavigator,
  SideBarDesktop,
  type MenuType,
} from '@abqm-ds/react';

// import * as S from './styles.ts';

import { useAuth } from '../../contexts/auth/useAuth.ts';
import { useDeviceType } from '@abqm-ds/react';
import { useEffect, useState } from 'react';
import type { MenuResponseObj } from './types.ts';

import { useResultadosApi } from '@src/services/useResultadosApi.ts';
import NotPointedEvents from '@src/components/Results/NotPointedEvents/index.tsx';
import MoreSearchedModalities from '@src/components/Results/MoreSearchedModalities/index.tsx';
import OtherSearchModalities from '@src/components/Results/OtherSearchModalities/index.tsx';

function Main() {
  const { user, logout, token } = useAuth();
  const { isTabletOrMobile } = useDeviceType();
  const { getMenu } = useResultadosApi();
  const [loading, setLoading] = useState<boolean>(true);

  const pageTitle = 'Resultados';

  const [menu, setMenu] = useState<MenuType>([]);

  useEffect(() => {
    const loadMenu = async () => {
      const menu: MenuResponseObj = await getMenu();

      console.log('Menu loaded:', menu);
      console.log('TODO definir em que API vai ficar o menu:');

      setMenu(menu.list_menu);
      setLoading(false);
    };
    loadMenu();
  }, [getMenu]);

  return (
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

          <ContentDektop
            header={<Header text={pageTitle} />}
            contentBoxStyles={{ padding: '1rem 0', gap: '0' }}
          >
            {loading ? (
              <ActivityIndicator width={30} height={30} />
            ) : (
              <>
                <NotPointedEvents />
                <MoreSearchedModalities />
                <OtherSearchModalities />
              </>
            )}
          </ContentDektop>
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

          <ContentMobile
            headerMobileNavigator={<HeaderMobileNavigator></HeaderMobileNavigator>}
          >
            {loading ? <ActivityIndicator width={30} height={30} /> : <></>}
          </ContentMobile>
        </ContainerMobile>
      )}
    </GlobalContainer>
  );
}

export default Main;
