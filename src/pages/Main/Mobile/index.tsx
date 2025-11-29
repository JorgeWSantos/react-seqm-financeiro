import { ContentMobile, HeaderMobileNavigator } from '@abqm-ds/react';
import { ContainerMobileMain } from './styles';

interface MobileProps {
  pageName: string;
  handleOnGoBack: () => void;
}

const Mobile = ({ pageName, handleOnGoBack }: MobileProps) => {
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
};

export { Mobile };
