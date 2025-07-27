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
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useTop10 } from '@src/services/useTop10';
import type { Top10ResponseData, Top10Data, EventDetailsTop10 } from './types.api';
import type { ModalitiesEvents } from './types';
import { useParams } from 'react-router';
import Layout from '@src/Layout';
import { useEventSummary } from '@src/services/useEventSummary';
import type { InfoEventSummaryData } from '../EventSummary/types.api';

function Top10() {
  const params = useParams();
  const prove_id = params.prove_id;
  const prove_event_id = params.prove_event_id;

  const pageTitle = 'Resultados »';
  const subTitle = getNameProveById(Number(prove_id)) + ' » TOP 10';

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getTop10 } = useTop10();
  const [isLoading, setIsLoading] = useState(true);
  const { getInfoEvent } = useEventSummary();

  const [allList, setAllList] = useState<Top10Data[]>([]);
  const [listToShow, setListToShow] = useState<Top10Data[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const [eventInfoData, setEventInfoData] = useState<EventDetailsTop10 | null>(
    {} as EventDetailsTop10
  );

  const handleGetResultsTop10 = useCallback(async () => {
    if (!prove_event_id) {
      return;
    }

    const data = await getTop10({
      prove_event_id: Number(prove_event_id),
    });

    console.log('Top10 data:', data);

    setEventInfoData(data.detalhe_evento);
  }, [getTop10, prove_event_id]);

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  // // Effect to filter the list based on searchValue
  // useEffect(() => {
  //   if (searchValue.trim() === '') {
  //     setListToShow(allList);
  //     return;
  //   }

  //   const filteredList = allList.filter(
  //     (item) =>
  //       item.cds_evento.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.cds_empresa.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.cds_local_evento.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.data_inicio_evento.includes(searchValue) ||
  //       item.data_fim_evento.includes(searchValue)
  //   );

  //   setListToShow(filteredList);
  // }, [searchValue, allList]);

  useEffect(() => {
    handleGetResultsTop10();
  }, [handleGetResultsTop10]);

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
            header={<Header text={pageTitle} subTitle={subTitle} buttons={[]} />}
            headerNavigator={
              <HeaderNavigatorDesktop
                title={eventInfoData?.cds_evento || ''}
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
                headingText={getNameProveById(Number(prove_id))}
                hasSearch
                onChangeSearch={(v) => setSearchValue(v.target.value)}
              />
            }
          >
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
    </Layout>
  );
}

export default Top10;
