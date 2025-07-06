import {
  ContentDektop,
  ContentMobile,
  Header,
  HeaderNavigatorDesktop,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain } from './styles';
import { useEffect } from 'react';
// import { useResultsService } from '@src/services/useResultsService';
import { useNavigate } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';

function ModalityDetail() {
  const pageTitle = 'Modalidade Detalhe';

  const navigate = useNavigate();

  console.log('navigate', navigate);
  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  // const { getResultados, saveMoreSearched } = useResultsService();

  // const [allModalities, setAllModalities] = useState<ResultModalitiesResponseData>({
  //   top_10_modalidades: [],
  //   modalidades: [],
  // });

  // const fetchModalities = useCallback(async () => {
  //   const data = await getResultados();
  //   setAllModalities(data);
  // }, [getResultados]);

  // useEffect(() => {
  //   fetchModalities();
  // }, [fetchModalities]);

  useEffect(() => {
    setPage({ page_title: pageTitle });
  }, [setPage]);

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={<Header text={pageTitle} />}
          headerNavigator={<HeaderNavigatorDesktop title={pageTitle} hasBackButton />}
          contentBoxStyles={{ padding: '1rem 2.5rem', gap: '0' }}
        >
          <></>
        </ContentDektop>
      ) : (
        <ContentMobile>
          <></>
        </ContentMobile>
      )}
    </ContainerMain>
  );
}

export default ModalityDetail;
