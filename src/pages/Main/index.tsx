import { ContentDektop, ContentMobile, Header } from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import NotPointedEvents from '@src/components/Main/NotPointedEvents';
import MoreSearchedModalities from '@src/components/Main/MoreSearchedModalities';
import OtherSearchModalities from '@src/components/Main/OtherSearchModalities';
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

  const pageTitle = 'Ranch Sorting';

  console.warn('Implementar Loading');

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={<Header text={pageTitle} />}
          contentBoxStyles={{ padding: '1rem 2.5rem', gap: '0' }}
        >
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
        <ContentMobile>
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
