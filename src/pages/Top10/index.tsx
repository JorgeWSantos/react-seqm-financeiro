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
import type { Top10ResponseData, Top10Data } from './types.api';
import type { ModalitiesEvents } from './types';
import { useParams } from 'react-router';
import Layout from '@src/Layout';

function Top10() {
  const pageTitle = 'Resultados';

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const prove_id = params.prove_id;

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getTop10 } = useTop10();
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState<Top10Data[]>([]);
  const [listToShow, setListToShow] = useState<Top10Data[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const setResultsToShow = useCallback(
    ({ data, isOficial }: { data: Top10ResponseData; isOficial: string }) => {
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

      const data = await getTop10({
        prove_id: prove_id === 'nao-pontuados' ? 0 : Number(prove_id),
        year,
        month,
      });

      setResultsToShow({ data, isOficial });

      setIsLoading(false);
    },
    [getTop10, prove_id, setResultsToShow]
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
    <Layout>
      <ContainerMain>
        {!isTabletOrMobile ? (
          <ContentDektop
            header={<Header text={pageTitle} buttons={[]} />}
            headerNavigator={
              <HeaderNavigatorDesktop
                title={getNameProveById(Number(prove_id))}
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
