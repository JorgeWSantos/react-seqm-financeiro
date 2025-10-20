import {
  ContentDektop,
  ContentMobile,
  Header,
  Text,
  useDeviceType,
} from '@abqm-ds/react';
import { ContainerMain } from './styles';
import { colors } from '@abqm-ds/tokens';

const Healthz = () => {
  const { isTabletOrMobile } = useDeviceType();

  if (isTabletOrMobile) {
    return (
      <ContainerMain>
        <ContentMobile
          style={{
            maxWidth: '100vw',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '0',
          }}
          contentMobileBoxStyles={{
            gap: '0.5rem',
            padding: '1.5rem',
          }}
          headerMobileNavigator={<></>}
        >
          <Text fontSize="xl" fontWeight="semiBold" color={colors.emeraldGreen75}>
            Status 200
          </Text>
        </ContentMobile>
      </ContainerMain>
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={'Healthz'} />}
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        footerType="medium"
      >
        <Text fontSize="xl" fontWeight="semiBold" color={colors.emeraldGreen75}>
          Status 200
        </Text>
      </ContentDektop>
    </ContainerMain>
  );
};

export default Healthz;
