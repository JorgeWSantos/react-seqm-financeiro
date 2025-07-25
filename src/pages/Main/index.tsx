import { ContentDektop, ContentMobile, Header } from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import NotPointedEvents from '@src/components/Main/NotPointedEvents';
import MoreSearchedModalities from '@src/components/Main/MoreSearchedModalities';
import OtherSearchModalities from '@src/components/Main/OtherSearchModalities';
import { ContainerDesktopMain, ContainerMain, ContainerMobileMain } from './styles';
import { useCallback, useEffect } from 'react';
import { useResultsService } from '@src/services/useResultsService';
import { usePage } from '@src/contexts/page/usePage';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@src/Layout';

function Main() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const { setPage, currentPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getResultados, saveMoreSearched } = useResultsService();

  const onClickModality = useCallback(
    async ({
      id_prova,
      cds_tipo_prova,
    }: {
      id_prova: string | number;
      cds_tipo_prova: string;
    }) => {
      if (id_prova !== 'nao-pontuados') {
        await saveMoreSearched({ id_prova: Number(id_prova) });
      }

      const navigateTo = `/modalidade/${id_prova}`;

      navigate(navigateTo, {
        state: { _previousPage: currentPage, modality: { id_prova, cds_tipo_prova } },
      });
    },
    [saveMoreSearched, navigate, currentPage]
  );

  const { data: allModalities = { top_modalidades: [], modalidades: [] } } = useQuery({
    queryKey: ['modalities'],
    queryFn: getResultados,
    staleTime: 1000 * 60 * 3, // 3 minutos
    gcTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    setPage({ page_title: pageTitle, path: location.pathname });
  }, [setPage]);

  return (
    <Layout>
      <ContainerMain>
        {!isTabletOrMobile ? (
          <ContentDektop
            header={<Header text={pageTitle} />}
            contentBoxStyles={{ padding: '1rem 2.5rem', gap: '0' }}
          >
            <>
              <NotPointedEvents onClick={onClickModality} />
              <ContainerDesktopMain>
                <MoreSearchedModalities
                  title="MODALIDADES MAIS BUSCADAS"
                  data={allModalities.top_modalidades}
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
                data={allModalities.top_modalidades}
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
    </Layout>
  );
}

export default Main;
