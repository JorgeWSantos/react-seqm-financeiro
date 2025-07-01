import { ContentDektop, ContentMobile, Header } from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import NotPointedEvents from '@src/components/NotPointedEvents';
import MoreSearchedModalities from '@src/components/MoreSearchedModalities';
import OtherSearchModalities from '@src/components/OtherSearchModalities';
import { ContainerDesktopMain, ContainerMain, ContainerMobileMain } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useResultsService } from '@src/services/useResultsService';
import type { ModalitiesResponseData } from './types';

function Main() {
  const { isTabletOrMobile } = useDeviceType();
  const { getResultados } = useResultsService();

  const [allModalities, setAllModalities] = useState<ModalitiesResponseData>({
    top10: [],
    modalidades: [],
  });

  // const loading = false; // Replace with actual loading state if needed
  const fetchModalities = useCallback(async () => {
    const data = await getResultados();
    setAllModalities(data);
  }, [getResultados]);

  useEffect(() => {
    fetchModalities();
  }, [fetchModalities]);

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
              <MoreSearchedModalities
                title="MODALIDADES MAIS BUSCADAS"
                data={allModalities.top10}
              />
              <OtherSearchModalities
                title="DEMAIS MODALIDADES"
                data={allModalities.modalidades}
              />
            </ContainerDesktopMain>
          </>
        </ContentDektop>
      ) : (
        <ContentMobile style={{ minHeight: '90vh' }}>
          <ContainerMobileMain className="container-mobile-main">
            <MoreSearchedModalities title="MAIS BUSCADAS" data={allModalities.top10} />
            <OtherSearchModalities
              title="DEMAIS MODALIDADES"
              data={allModalities.modalidades}
            />
          </ContainerMobileMain>
        </ContentMobile>
      )}
    </ContainerMain>
  );
}

export default Main;
