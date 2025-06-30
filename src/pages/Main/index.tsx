import { ContentDektop, ContentMobile, Header } from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import NotPointedEvents from '@src/components/Results/NotPointedEvents/index.tsx';
import MoreSearchedModalities from '@src/components/Results/MoreSearchedModalities/index.tsx';
import OtherSearchModalities from '@src/components/Results/OtherSearchModalities/index.tsx';
import { ContainerDesktopMain, ContainerMain } from './styles';

function Main() {
  const { isTabletOrMobile } = useDeviceType();

  // const loading = false; // Replace with actual loading state if needed

  const pageTitle = 'Resultados';

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={<Header text={pageTitle} />}
          contentBoxStyles={{ padding: '1rem 0', gap: '0' }}
        >
          {/* {loading ? (
            <ActivityIndicator width={30} height={30} />
          ) */}

          <>
            <NotPointedEvents />
            <ContainerDesktopMain>
              <MoreSearchedModalities />
              <OtherSearchModalities />
            </ContainerDesktopMain>
          </>
        </ContentDektop>
      ) : (
        <ContentMobile>
          <>
            <NotPointedEvents />
            <MoreSearchedModalities />
            <OtherSearchModalities />
          </>
        </ContentMobile>
      )}
    </ContainerMain>
  );
}

export default Main;
