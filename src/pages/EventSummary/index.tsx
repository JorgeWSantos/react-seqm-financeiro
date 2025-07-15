import {
  ActivityIndicator,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  InfoCard,
  StyledTableSEQMTextTd,
  TableSEQM,
  TableSEQMColumnOficial,
  Text,
  type TableColumnSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ContainerMain,
  DivInfoCard,
  DivLeft,
  DivRight,
  DivTopMobile,
  LoadingContainer,
  NotFoundContainer,
  Scrollable,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { PrinterIcon, StarIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useModalityDetails } from '@src/services/useModalityDetails';
import type { ModalityDetailsResponseData, ResultModality } from './types.api';
import type { ModalitiesEvents } from './types';
import { useParams } from 'react-router';
import InfoEventDetails from './InfoEventDetails';
import EventSummaryDetails from './EventSummaryDetails';
import GraphSummaryDetails from './GraphSummaryDetails';

function EventSummary() {
  const pageTitle = 'Resultados »';

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id_prova = params.id_prova;

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getModalityDetails } = useModalityDetails();
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState<ResultModality[]>([]);
  const [listToShow, setListToShow] = useState<ResultModality[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

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
        prove_id: id_prova === 'nao-pontuados' ? 0 : Number(id_prova),
        year,
        month,
      });

      setResultsToShow({ data, isOficial });

      setIsLoading(false);
    },
    [getModalityDetails, id_prova, setResultsToShow]
  );

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
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={
            <Header
              text={pageTitle}
              subTitle={getNameProveById(Number(id_prova))}
              buttons={[
                {
                  icon: <StarIcon fill={colors.emeraldGreen50} />,
                  label: 'participações',
                  onClick: () => {},
                },
                {
                  icon: <PrinterIcon fill={colors.emeraldGreen50} />,
                  label: 'imprimir',
                  onClick: () => {},
                },
                {
                  icon: <PrinterIcon fill={colors.emeraldGreen50} />,
                  label: 'compartilhar',
                  onClick: () => {},
                },
              ]}
            />
          }
          headerNavigator={
            <HeaderNavigatorDesktop
              title={'34º Congresso Brasileiro da Raça Quarto de Milha'}
              hasBackButton
              onGoBack={() => navigate('/modalidade/' + id_prova)}
            />
          }
          contentBoxStyles={{
            padding: '1.5rem',
            gap: '0.25rem',
          }}
          count={data.length}
        >
          <Scrollable>
            <DivLeft>
              <InfoEventDetails />
              <EventSummaryDetails />
              <GraphSummaryDetails />
            </DivLeft>
            <DivRight></DivRight>
            {/* {data.length > 0 ? (
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
            )} */}
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
    </ContainerMain>
  );
}

export default EventSummary;
