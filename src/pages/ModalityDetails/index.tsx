import {
  ActivityIndicator,
  ContentDektop,
  ContentMobile,
  deepEqual,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  InfoCard,
  RoundedButton,
  StyledTableSEQMTextTd,
  TableSEQM,
  TableSEQMColumnOficial,
  Text,
  TextInput,
  type TableColumnSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ContainerMain,
  DivInfoCard,
  DivTopMobile,
  LoadingContainer,
  NotFoundContainer,
  Scrollable,
} from './styles';
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
import Layout from '@src/Layout';

function ModalityDetail() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const prove_id = params.prove_id;

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getModalityDetails } = useModalityDetails();
  const [isLoading, setIsLoading] = useState(true);

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

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

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
      setIsLoading(true);

      const data = await getModalityDetails({
        prove_id: prove_id === 'nao-pontuados' ? 0 : Number(prove_id),
        year,
        month,
      });

      setResultsToShow({ data, isOficial });

      setIsLoading(false);
    },
    [getModalityDetails, prove_id, setResultsToShow]
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

    closeModal();
  }, [filter, fetchModalities, closeModal]);

  const handleClearFilter = useCallback(() => {
    setFilter(initialFilter);

    fetchModalities({
      year: initialFilter.year.value,
      month: initialFilter.month.value,
      isOficial: initialFilter.oficial.value,
    });
    closeModal();
  }, [initialFilter, fetchModalities, closeModal]);

  const columns: Array<TableColumnSEQM<ModalitiesEvents>> = [
    {
      key: 'event',
      label: 'EVENTO',
      width: '35%',
      render: (row: ModalitiesEvents) => {
        if (row.isOficial) {
          return <TableSEQMColumnOficial textBold={true} value={row.event} />;
        }

        return <StyledTableSEQMTextTd $bold>{row.event}</StyledTableSEQMTextTd>;
      },
      textBold: true,
    },
    { key: 'organizator', label: 'ORGANIZADOR', width: '35%' },
    {
      key: 'local',
      label: 'LOCAL',
      width: '20%',
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
    <Layout>
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
                    onClick: openModal,
                    isActive: !deepEqual(filter, initialFilter),
                  },
                ]}
              />
            }
            headerNavigator={
              <HeaderNavigatorDesktop
                title={
                  prove_id === 'nao-pontuados'
                    ? 'Eventos Não Pontuados'
                    : getNameProveById(Number(prove_id))
                }
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
              padding: '1.5rem',
              gap: '0.25rem',
            }}
            count={data.length}
          >
            <Scrollable>
              {data.length > 0 ? (
                <TableSEQM data={data} columns={columns} />
              ) : (
                <>
                  {isLoading ? (
                    <LoadingContainer>
                      <ActivityIndicator width={20} height={20} />
                    </LoadingContainer>
                  ) : (
                    <NotFoundContainer>
                      <Text
                        fontSize="smm"
                        fontWeight="semiBold"
                        color={colors.emeraldGreen75}
                      >
                        Nenhum resultado encontrado
                      </Text>
                    </NotFoundContainer>
                  )}
                </>
              )}
            </Scrollable>
          </ContentDektop>
        ) : (
          <ContentMobile
            style={{
              maxWidth: '100vw',
            }}
            headerMobileNavigator={
              <HeaderMobileNavigator
                hasBackButton
                onGoBack={() => navigate('/')}
                headingText="Ranch Sorting"
                hasSearch
                onChangeSearch={(v) => setSearchValue(v.target.value)}
              />
            }
          >
            <DivTopMobile>
              <DivInfoCard>
                <InfoCard
                  title={allList
                    .filter((item) => item.bid_oficial === true)
                    .length.toString()}
                  subTitle="Oficiais"
                />
                <InfoCard
                  title={allList
                    .filter((item) => item.bid_oficial === false)
                    .length.toString()}
                  subTitle="Oficializadas"
                />
              </DivInfoCard>

              <RoundedButton
                width={'2rem'}
                height={'2rem'}
                isActive={!deepEqual(filter, initialFilter)}
              >
                <FilterIcon width={'1rem'} height={'1rem'} onClick={openModal} />
              </RoundedButton>
            </DivTopMobile>

            <Scrollable>
              {data.length > 0 ? (
                <TableSEQM data={data} columns={columns} width={'100rem'} />
              ) : (
                <>
                  {isLoading ? (
                    <LoadingContainer>
                      <ActivityIndicator width={20} height={20} />
                    </LoadingContainer>
                  ) : (
                    <NotFoundContainer>
                      <Text
                        fontSize="smm"
                        fontWeight="semiBold"
                        color={colors.emeraldGreen75}
                      >
                        Nenhum resultado encontrado
                      </Text>
                    </NotFoundContainer>
                  )}
                </>
              )}
            </Scrollable>
          </ContentMobile>
        )}

        <ModalFilter
          handleCloseModal={closeModal}
          item={{}}
          isModalOpen={modalOpen}
          filter={filter}
          setFilter={setFilter}
          years={years}
          months={months}
          optionsOficial={optionsOficial}
          handleApplyFilter={handleApplyFilter}
          handleClearFilter={handleClearFilter}
        />
      </ContainerMain>
    </Layout>
  );
}

export default ModalityDetail;
