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

import { ContainerMain, NotFoundContainer, Scrollable } from './styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { FilterIcon, SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useModalityDetails } from '@src/services/useModalityDetails';
import type { ModalityDetailsResponseData, ResultModality } from './types.api';
import type { ModalDetailsFilter, ModalitiesEvents } from './types';
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

  const optionsOficial = useMemo(
    () => [
      { label: 'Todos', value: '', id: '0' },
      { label: 'Oficiais', value: 'true', id: '1' },
      { label: 'Oficializados', value: 'false', id: '2' },
    ],
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear; i >= 1990; i--) {
      yearsArray.push({ value: String(i), label: String(i), id: String(i) });
    }
    return yearsArray;
  }, []);

  const months = useMemo(
    () => [
      { value: '0', label: 'Todos', id: '0' },
      { value: '1', label: 'Janeiro', id: '1' },
      { value: '2', label: 'Fevereiro', id: '2' },
      { value: '3', label: 'Março', id: '3' },
      { value: '4', label: 'Abril', id: '4' },
      { value: '5', label: 'Maio', id: '5' },
      { value: '6', label: 'Junho', id: '6' },
      { value: '7', label: 'Julho', id: '7' },
      { value: '8', label: 'Agosto', id: '8' },
      { value: '9', label: 'Setembro', id: '9' },
      { value: '10', label: 'Outubro', id: '10' },
      { value: '11', label: 'Novembro', id: '11' },
      { value: '12', label: 'Dezembro', id: '12' },
    ],
    []
  );

  const initialFilter: ModalDetailsFilter = useMemo(
    () => ({
      year: years[0],
      month: months[0],
      oficial: optionsOficial[0],
    }),
    [years, months, optionsOficial]
  );

  const [filter, setFilter] = useState<ModalDetailsFilter>(initialFilter);

  const [allList, setAllList] = useState<ResultModality[]>([]);
  const [listToShow, setListToShow] = useState<ResultModality[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const [modal, setModal] = useState<any>({
    isOpen: true,
    open: () => setModal({ ...modal, isOpen: true }),
    close: () => setModal({ ...modal, isOpen: false }),
  });

  const setResultsToShow = useCallback(
    ({ data, isOficial }: { data: ModalityDetailsResponseData; isOficial: string }) => {
      const eventsToShow = [];

      if (data.eventos.length > 0) {
        eventsToShow.push(...data.eventos);
      }

      if (data.eventos_nao_pontuados.length > 0) {
        eventsToShow.push(...data.eventos_nao_pontuados);
      }

      setListToShow(
        isOficial !== ''
          ? eventsToShow.filter((item) => String(item.bid_oficial) === isOficial)
          : eventsToShow
      );
      setAllList(
        isOficial !== ''
          ? eventsToShow.filter((item) => String(item.bid_oficial) === isOficial)
          : eventsToShow
      );
    },
    []
  );

  const fetchModalities = useCallback(
    async ({
      year,
      month,
      isOficial,
    }: {
      year: string;
      month: string;
      isOficial: string;
    }) => {
      const data = await getModalityDetails({
        prove_id: id_prova ? Number(id_prova) : null,
        year,
        month,
      });

      setResultsToShow({ data, isOficial });
    },
    [getModalityDetails, id_prova, setResultsToShow]
  );

  useEffect(() => {
    if (filter === initialFilter) {
      fetchModalities({
        year: filter.year.value,
        month: filter.month.value,
        isOficial: filter.oficial.value,
      });
    }
  }, [fetchModalities, filter, initialFilter]);

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
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
        item.data_inicio_evento.includes(searchValue) ||
        item.data_fim_evento.includes(searchValue)
    );

    setListToShow(filteredList);
  }, [searchValue, allList]);

  const handleApplyFilter = useCallback(() => {
    fetchModalities({
      year: filter.year.value,
      month: filter.month.value,
      isOficial: filter.oficial.value,
    });

    modal.close();
  }, [filter, fetchModalities, modal]);

  const handleClearFilter = useCallback(() => {
    setFilter(initialFilter);

    fetchModalities({
      year: initialFilter.year.value,
      month: initialFilter.month.value,
      isOficial: initialFilter.oficial.value,
    });
    modal.close();
  }, [initialFilter, fetchModalities, modal]);

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
    init: item.data_inicio_evento,
    end: item.data_fim_evento,
    isOficial: item.bid_oficial,
  }));

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={
            <Header
              text={pageTitle}
              buttons={[
                {
                  icon: <FilterIcon fill={colors.emeraldGreen50} />,
                  label: 'filtro',
                  onClick: modal.open,
                  isFiltered: filter != initialFilter,
                  // onClick: () => console.log('clicou em animais'), //exibe o console no devtools do chrome
                },
              ]}
            />
          }
          headerNavigator={
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
          }
          contentBoxStyles={{
            padding: '1rem 2.5rem',
            gap: '0.25rem',
          }}
        >
          <Scrollable>
            {data.length > 0 ? (
              <TableSEQM data={data} columns={columns} />
            ) : (
              <NotFoundContainer>
                <Text fontSize="smm" fontWeight="semiBold" color={colors.emeraldGreen75}>
                  Nenhum resultado encontrado
                </Text>
              </NotFoundContainer>
            )}
          </Scrollable>
        </ContentDektop>
      ) : (
        <ContentMobile>
          <></>
        </ContentMobile>
      )}

      <ModalFilter
        handleCloseModal={modal.close}
        item={{}}
        isModalOpen={modal.isOpen}
        filter={filter}
        setFilter={setFilter}
        years={years}
        months={months}
        optionsOficial={optionsOficial}
        handleApplyFilter={handleApplyFilter}
        handleClearFilter={handleClearFilter}
      />
    </ContainerMain>
  );
}

export default ModalityDetail;
