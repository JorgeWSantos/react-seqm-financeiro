import { useDeviceType } from '@abqm-ds/react';

import NotPointedEvents from '@src/components/Main/NotPointedEvents';
import MoreSearchedModalities from '@src/components/Main/MoreSearchedModalities';
import OtherSearchModalities from '@src/components/Main/OtherSearchModalities';
import { ContainerDesktopMain, ContainerMobileMain } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useResultsService } from '@src/services/useResultsService';
import type { ModalitiesResponseData } from './types';
import { usePage } from '@src/contexts/page/usePage';

function ModalityDetail() {
  const { isTabletOrMobile } = useDeviceType();
  const { getResultados } = useResultsService();
  const { setPage } = usePage();

  const [allModalities, setAllModalities] = useState<ModalitiesResponseData>({
    top10: [],
    modalidades: [],
  });

  const fetchModalities = useCallback(async () => {
    const data = await getResultados();
    setAllModalities(data);
  }, [getResultados]);

  useEffect(() => {
    fetchModalities();
  }, [fetchModalities]);

  useEffect(() => {
    setPage({ page_title: 'ModalityDetail' });
  }, [setPage]);

  console.warn('Implementar Loading');

  return (
    <>
      {!isTabletOrMobile ? (
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
      ) : (
        <ContainerMobileMain className="container-mobile-main">
          <MoreSearchedModalities title="MAIS BUSCADAS" data={allModalities.top10} />
          <OtherSearchModalities
            title="DEMAIS MODALIDADES"
            data={allModalities.modalidades}
          />
        </ContainerMobileMain>
      )}
    </>
  );
}

export default ModalityDetail;
