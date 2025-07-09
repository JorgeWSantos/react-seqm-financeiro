import {
  ContentDektop,
  ContentMobile,
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
// import { useResultsService } from '@src/services/useResultsService';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { FilterIcon, SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useModalityDetails } from '@src/services/useModalityDetails';
import type { ModalityDetailsResponseData, ResultModality } from './types.api';
import type { ModalitiesEvents } from './types';
import { useParams } from 'react-router';

function ModalityDetail() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id_prova = params.id_prova;

  // console.log('location', location);

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getModalityDetails } = useModalityDetails();

  // const [allResults, setAllResults] = useState<ModalityDetailsResponseData>({
  //   resultado_por_modalidade: [],
  //   eventos_nao_pontuados: [],
  //   eventos_por_mes_sem_resultado: [],
  //   eventos_por_mes: [],
  // });

  const [listToShow, setListToShow] = useState<ResultModality[]>([]);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>('');

  const fetchModalities = useCallback(async () => {
    const data = await getModalityDetails({
      prove_id: id_prova ? Number(id_prova) : null,
      year,
      month,
    });
    // setAllResults(data);

    const eventsToShow = [];

    if (data.resultado_por_modalidade.length > 0) {
      eventsToShow.push(...data.resultado_por_modalidade);
    }

    if (data.eventos_nao_pontuados.length > 0) {
      eventsToShow.push(...data.eventos_nao_pontuados);
    }

    setListToShow(eventsToShow);
  }, [getModalityDetails, id_prova, year, month]);

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
        <TextInput
          placeholder="Buscar"
          onChange={(v) => console.log(v.target.value)}
          icon={<SearchIcon fill={colors.white75} />}
        />
      </HeaderNavigatorDesktop>
    );
  }, [
    location.state._previousPage.path,
    location.state.modality.cds_tipo_prova,
    navigate,
  ]);

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
    </ContainerMain>
  );
}

export default ModalityDetail;
