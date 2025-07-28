import {
  ActivityIndicator,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  StyledTableSEQMTextTd,
  TableSEQM,
  Text,
  TextInput,
  type TableColumnSEQM,
  type TableRowSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain, LoadingContainer, NotFoundContainer, Scrollable } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useTop10 } from '@src/services/useTop10';
import type { Top10Data, EventDetailsTop10 } from './types.api';
import { useParams } from 'react-router';
import Layout from '@src/Layout';

function Top10() {
  const params = useParams();
  const prove_id = params.prove_id;
  const prove_event_id = params.prove_event_id;
  const event_id = params.event_id;

  const pageTitle = 'Resultados »';
  const subTitle = getNameProveById(Number(prove_id)) + ' » TOP 10';

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getTop10 } = useTop10();
  const [isLoading, setIsLoading] = useState(true);

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

    const teams: any[] = [];

    for (const registry of data.top10) {
      const existingGroup = teams.find(
        (group) => group.classification === registry.nnr_classificacao_abqm
      );
      if (existingGroup) {
        existingGroup.items.push(registry);
      } else {
        teams.push(registry);
      }
    }

    setAllList(teams);
    setListToShow(teams);

    console.log('Teams:', teams);

    setEventInfoData(data.detalhe_evento);
    setIsLoading(false);
  }, [getTop10, prove_event_id]);

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  // Effect to filter the list based on searchValue
  useEffect(() => {
    console.log('Search Value:', searchValue);

    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const filteredList = allList.filter(
      (item) =>
        item.cds_nome_competidor.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.cds_nome_animal.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.proprietario.includes(searchValue) ||
        item.cds_pontuacao.includes(searchValue)
    );

    setListToShow(filteredList);
  }, [searchValue, allList]);

  useEffect(() => {
    handleGetResultsTop10();
  }, [handleGetResultsTop10]);

  const columns: Array<TableColumnSEQM> = [
    {
      key: 'abqm',
      label: 'ABQM',
      width: '3%',
      align: 'center',
    },
    { key: 'competitor', label: 'COMPETIDOR', width: '15%' },
    {
      key: 'animal',
      label: 'ANIMAL',
      width: '20%',
      align: 'left',
    },
    {
      key: 'owner',
      label: 'PROPRIETÁRIO',
      width: '20%',
      align: 'left',
    },
    {
      key: 'tn',
      label: 'T/N',
      align: 'center',
      minWidth: '76px',
    },
    // { key: 'modality', label: 'MODALIDADE', width: '20%' },
    // {
    //   key: 'filiation',
    //   label: 'Filiação',
    //   minWidth: '76px',
    //   align: 'center',
    // },
  ];

  const data: Array<TableRowSEQM> = listToShow.map((item, index) => ({
    abqm: { value: `${index + 1}°` },
    competitor: { value: item.cds_nome_competidor.toUpperCase() },
    animal: {
      render: () => {
        return (
          <StyledTableSEQMTextTd $bold>
            {item.cds_nome_animal.toUpperCase()}
          </StyledTableSEQMTextTd>
        );
      },
    },
    owner: { value: item.proprietario.toUpperCase() },
    tn: { value: item.cds_pontuacao },
    // modality: { value: item.cds_modalidade.toUpperCase() },
    // filitation: item.cds_filiacao,
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
                onGoBack={() =>
                  navigate('/modalidade/' + prove_id + '/evento/' + event_id)
                }
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
