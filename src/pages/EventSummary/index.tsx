import {
  ActivityIndicator,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  InfoCard,
  TableSEQM,
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
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { PrinterIcon, StarIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import type { TableEventSummaryData } from './types';
import { useParams } from 'react-router';
import InfoEventDetails from './InfoEventDetails';
import EventSummaryDetails from './EventSummaryDetails';
import GraphSummaryDetails from './GraphSummaryDetails';
import { useEventSummary } from '@src/services/useEventSummary';
import type {
  EventSummaryResponseData,
  InfoEventSummaryData,
  ResultModalityByProve,
} from './types.api';
import { useCallback, useEffect, useState } from 'react';

function EventSummary() {
  const pageTitle = 'Resultados »';

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const prove_id = params.prove_id;
  const event_id = params.event_id;

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getEventSummary, getInfoEvent } = useEventSummary();

  const [isLoading, setIsLoading] = useState(true);
  const [eventSummaryData, setEventSummaryData] = useState<EventSummaryResponseData>(
    {} as EventSummaryResponseData
  );
  const [eventInfoData, setEventInfoData] = useState<InfoEventSummaryData | null>(
    {} as InfoEventSummaryData
  );
  const [listToShow, setListToShow] = useState<ResultModalityByProve[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleGetSummary = useCallback(async () => {
    if (!prove_id || !event_id) {
      setIsLoading(false);
      return;
    }

    const data = await getEventSummary({
      prove_id: prove_id === 'nao-pontuados' ? 0 : Number(prove_id),
      event_id: Number(event_id),
    });

    setEventSummaryData(data);
  }, [getEventSummary, prove_id, event_id]);

  const handleGetEventInfo = useCallback(async () => {
    if (!event_id) {
      return;
    }

    const data = await getInfoEvent({
      event_id: Number(event_id),
    });

    setEventInfoData(data);
  }, [getInfoEvent, event_id]);

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
      setListToShow(eventSummaryData.resultado_modalidade_prova);
      return;
    }

    const filteredList = eventSummaryData.resultado_modalidade_prova.filter(
      (item) => item.cds_evento.toLowerCase().includes(searchValue.toLowerCase()) // ||
      // item.cds_empresa.toLowerCase().includes(searchValue.toLowerCase()) ||
      // item.cds_local_evento.toLowerCase().includes(searchValue.toLowerCase()) ||
      // item.data_inicio_evento.includes(searchValue) ||
      // item.data_fim_evento.includes(searchValue)
    );

    setListToShow(filteredList);
  }, [searchValue, eventSummaryData]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      await handleGetSummary();
      await handleGetEventInfo();

      setIsLoading(false);
    };

    loadData();
  }, [prove_id, handleGetSummary, handleGetEventInfo]);

  const columns: Array<TableColumnSEQM<TableEventSummaryData>> = [
    {
      key: 'category',
      label: 'Categoria',
      width: '35%',
    },
    { key: 'organizator', label: 'ORGANIZADOR', width: '35%' },
    {
      key: 'judge',
      label: 'Juíz',
      width: '20%',
      align: 'left',
    },
    {
      key: 'ABQM',
      label: 'ABQM',
      align: 'center',
      minWidth: '76px',
    },
    {
      key: 'inscriptions',
      label: 'Inscrições',
      minWidth: '76px',
      align: 'center',
    },
  ];

  const data: Array<TableEventSummaryData> = listToShow?.map((item) => ({
    category: item.cds_evento.toUpperCase(),
    organizator: item.cds_status_organizador ? 'Sim' : 'Não',
    judge: item.cds_status_juiz ? 'Sim' : 'Não',
    ABQM: item.cds_status_abqm ? 'Sim' : 'Não',
    inscriptions: item.participantes.toString(),
  }));

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={
            <Header
              text={pageTitle}
              subTitle={getNameProveById(Number(prove_id))}
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
              onGoBack={() => navigate('/modalidade/' + prove_id)}
            />
          }
          contentBoxStyles={{
            padding: '1.5rem',
            gap: '0.25rem',
          }}
          // count={data.length}
        >
          <Scrollable>
            <DivLeft>
              {/* <InfoEventDetails data={eventInfoData} />
              <EventSummaryDetails
                data={
                  eventSummaryData.numeros_evento?.length > 0
                    ? eventSummaryData.numeros_evento[0]
                    : null
                }
              /> */}
              <GraphSummaryDetails data={eventSummaryData.tipo_estatistica_prova} />
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
          <></>
          {/* <DivTopMobile>
            <DivInfoCard>
              <InfoCard
                title={eventSummaryData
                  .filter((item) => item.bid_oficial === true)
                  .length.toString()}
                subTitle="Oficiais"
              />
              <InfoCard
                title={eventSummaryData
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
          </Scrollable> */}
        </ContentMobile>
      )}
    </ContainerMain>
  );
}

export default EventSummary;
