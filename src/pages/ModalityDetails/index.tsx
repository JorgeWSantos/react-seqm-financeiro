import {
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderNavigatorDesktop,
  TableSEQM,
  TableSEQMColumnOficial,
  Text,
  TextInput,
  type TableColumnSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { FilterIcon, SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useModalityDetails } from '@src/services/useModalityDetails';
import type { ModalityDetailsResponseData, ResultModality } from './types.api';
import type { ModalitiesEvents } from './types';
import { useParams } from 'react-router';
import { ModalFilter } from './ModalFilter';

function ModalityDetail() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id_prova = params.id_prova;

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getModalityDetails } = useModalityDetails();

  const [modal, setModal] = useState<any>({
    isOpen: true,
    open: () => setModal({ ...modal, isOpen: true }),
    close: () => setModal({ ...modal, isOpen: false }),
  });

  const [allList, setAllList] = useState<ResultModality[]>([]);
  const [listToShow, setListToShow] = useState<ResultModality[]>([]);
  const [year] = useState<string>(new Date().getFullYear().toString());
  const [month] = useState<string>('');

  const [searchValue, setSearchValue] = useState<string>('');

  const setResultsToShow = useCallback((data: ModalityDetailsResponseData) => {
    const eventsToShow = [];

    if (data.resultado_por_modalidade.length > 0) {
      eventsToShow.push(...data.resultado_por_modalidade);
    }

    if (data.eventos_nao_pontuados.length > 0) {
      eventsToShow.push(...data.eventos_nao_pontuados);
    }

    setListToShow(eventsToShow);
    setAllList(eventsToShow);
  }, []);

  const fetchModalities = useCallback(async () => {
    const data = await getModalityDetails({
      prove_id: id_prova ? Number(id_prova) : null,
      year,
      month,
    });

    setResultsToShow(data);
  }, [getModalityDetails, id_prova, year, month, setResultsToShow]);

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
        title={getNameProveById(Number(id_prova) || 1000)}
        hasBackButton
        onGoBack={() => navigate('/')}
      >
        <TextInput
          placeholder="Buscar"
          onChange={(v) => setSearchValue(v.target.value)}
          icon={<SearchIcon fill={colors.white75} />}
        />
      </HeaderNavigatorDesktop>
    );
  }, [navigate, id_prova]);

  useEffect(() => {
    fetchModalities();
  }, [fetchModalities]);

  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });

    // console.log('location', location);
    // console.log('location.state.modality.id_prova', location.state.modality.id_prova);
  }, [setPage, location]);

  // Effect to filter the list based on searchValue
  useEffect(() => {
    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const filteredList = allList.filter(
      (item) =>
        item.cds_evento.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.cds_empresa.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.cds_local_evento.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.ddt_inicio_evento.includes(searchValue) ||
        item.dt_fim_evento.includes(searchValue)
    );

    setListToShow(filteredList);
  }, [searchValue, allList]);

  const columns: Array<TableColumnSEQM<ModalitiesEvents>> = [
    {
      key: 'event',
      label: 'EVENTO',
      width: '30%',
      render: (row: ModalitiesEvents) => {
        if (row.isOficial) {
          return <TableSEQMColumnOficial value={row.event} />;
        }

        return (
          <Text fontSize="xxs" fontWeight="semiBold" lineHeight="tight">
            {row.event}
          </Text>
        );
      },
    },
    { key: 'organizator', label: 'ORGANIZADOR', width: '30%' },
    {
      key: 'local',
      label: 'LOCAL',
      width: '30%',
      align: 'left',
    },
    {
      key: 'init',
      label: 'INÍCIO',
      align: 'center',
      minWidth: '76px',
    },
    {
      key: 'end',
      label: 'FIM',
      minWidth: '76px',
      align: 'center',
    },
  ];

  const data: Array<ModalitiesEvents> = listToShow.map((item) => ({
    event: item.cds_evento.toUpperCase(),
    organizator: item.cds_empresa.toUpperCase(),
    local: item.cds_local_evento.toUpperCase(),
    init: item.ddt_inicio_evento.slice(0, 10),
    end: item.dt_fim_evento.slice(0, 10),
    isOficial: item.bid_oficial,
  }));

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={headerComponent()}
          headerNavigator={headerNavigator()}
          contentBoxStyles={{ padding: '1rem 2.5rem', gap: '0.25rem' }}
        >
          <TableSEQM data={data} columns={columns} />
        </ContentDektop>
      ) : (
        <ContentMobile>
          <></>
        </ContentMobile>
      )}

      <ModalFilter handleCloseModal={modal.close} item={{}} isModalOpen={modal.isOpen} />
    </ContainerMain>
  );
}

export default ModalityDetail;
