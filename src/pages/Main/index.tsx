import { ContentDektop, ContentMobile, Header } from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import NotPointedEvents from '@src/components/Main/NotPointedEvents';
import MoreSearchedModalities from '@src/components/Main/MoreSearchedModalities';
import OtherSearchModalities from '@src/components/Main/OtherSearchModalities';
import { ContainerDesktopMain, ContainerMain, ContainerMobileMain } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useResultsService } from '@src/services/useResultsService';
import type { ResultModalitiesResponseData } from './types.api';
import { usePage } from '@src/contexts/page/usePage';
import { useNavigate } from 'react-router-dom';

function Main() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const { setPage, currentPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getResultados, saveMoreSearched } = useResultsService();

  const [allModalities, setAllModalities] = useState<ResultModalitiesResponseData>({
    top_10_modalidades: [],
    modalidades: [],
  });

  const fetchModalities = useCallback(async () => {
    const data = await getResultados();
    setAllModalities(data);
  }, [getResultados]);

  const onClickModality = useCallback(
    async ({
      id_prova,
      cds_tipo_prova,
    }: {
      id_prova: number;
      cds_tipo_prova: string;
    }) => {
      await saveMoreSearched({ id_prova });

      const navigateTo = `/modalidade/${id_prova}`;
      navigate(navigateTo, {
        state: { _previousPage: currentPage, modality: { id_prova, cds_tipo_prova } },
      });
    },
    [saveMoreSearched, navigate, currentPage]
  );

  useEffect(() => {
    fetchModalities();
  }, [fetchModalities]);

  useEffect(() => {
    setPage({ page_title: pageTitle, path: location.pathname });
  }, [setPage]);

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
                data={allModalities.top_10_modalidades}
                onClick={onClickModality}
              />
              <OtherSearchModalities
                title="DEMAIS MODALIDADES"
                data={allModalities.modalidades}
                onClick={onClickModality}
              />
            </ContainerDesktopMain>
          </>
        </ContentDektop>
      ) : (
        <ContentMobile>
          <ContainerMobileMain className="container-mobile-main">
            <MoreSearchedModalities
              onClick={onClickModality}
              title="MAIS BUSCADAS"
              data={allModalities.top_10_modalidades}
            />
            <OtherSearchModalities
              onClick={onClickModality}
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
