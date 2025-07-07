import {
  ContentDektop,
  ContentMobile,
  Header,
  HeaderNavigatorDesktop,
  TextInput,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain } from './styles';
import { useCallback, useEffect } from 'react';
// import { useResultsService } from '@src/services/useResultsService';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { FilterIcon, PrinterIcon, SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';

function ModalityDetail() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const location = useLocation();

  // console.log('location', location);

  const { setPage, currentPage } = usePage();
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
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  useEffect(() => {
    const load = async () => {};

    load();
  }, [setPage, navigate]);

  useEffect(() => {
    console.log('currentPage', currentPage);
    console.log('location', location);
  }, [currentPage, location]);

  const headerComponent = useCallback(() => {
    return (
      <Header
        text={pageTitle}
        buttons={[
          {
            icon: <FilterIcon fill={colors.emeraldGreen50} />,
            label: 'filtro',
            onClick: () => console.log('clicou no filtro'),
            // isFiltered: true,
            // onClick: () => console.log('clicou em animais'), //exibe o console no devtools do chrome
          },
        ]}
      />
    );
  }, []);

  const headerNavigator = useCallback(() => {
    return (
      <HeaderNavigatorDesktop
        title={location.state.modality.cds_tipo_prova}
        hasBackButton
        onGoBack={() => navigate(location.state._previousPage.path)}
      >
        <TextInput placeholder="Buscar" icon={<SearchIcon fill={colors.white75} />} />
      </HeaderNavigatorDesktop>
    );
  }, [
    location.state._previousPage.path,
    location.state.modality.cds_tipo_prova,
    navigate,
  ]);

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={headerComponent()}
          headerNavigator={headerNavigator()}
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
