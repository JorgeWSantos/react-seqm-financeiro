import {
  ContentDektop,
  ContentMobile,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain, ContainerMobileMain } from './styles';

const Main = () => {
  const pageTitle = 'Financeiro';
  const pageName = 'Eventos ABQM';

  const { isTabletOrMobile } = useDeviceType();

  const handleOnGoBack = () => {
    window.history.back();
  };

  if (isTabletOrMobile) {
    return (
      <ContainerMobileMain>
        <ContentMobile
          style={{
            maxWidth: '100vw',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '0',
          }}
          contentMobileBoxStyles={{
            gap: '0.5rem',
            padding: '1.5rem 0rem 0rem 0rem',
          }}
          headerMobileNavigator={
            <HeaderMobileNavigator
              hasBackButton
              onGoBack={handleOnGoBack}
              headingText={pageName}
              // hasSearch
              // onChangeSearch={(v) => setSearchValue(v.target.value)}
            />
          }
        >
          teste
        </ContentMobile>
      </ContainerMobileMain>
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={pageTitle} />}
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        footerType="medium"
      >
        <HeaderNavigatorDesktop
          title={pageName}
          hasBackButton
          onGoBack={handleOnGoBack}
        />
      </ContentDektop>
    </ContainerMain>
  );
};

export default Main;
