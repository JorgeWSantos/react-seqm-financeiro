import {
  ActivityIndicator,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
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
import { useClassificatory } from '@src/services/useClassificatory';
import type { ClassificatoryData, EventDetailsClassificatory } from './types.api';
import type { TableClassificatory } from './types';
import { useParams } from 'react-router';
import Layout from '@src/Layout';

function Classificatory() {
  const params = useParams();
  const prove_id = params.prove_id;
  const prove_event_id = params.prove_event_id;
  const event_id = params.event_id;

  const pageTitle = 'Resultados »';
  const subTitle = getNameProveById(Number(prove_id));

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getClassificatory } = useClassificatory();
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState<ClassificatoryData[]>([]);
  const [listToShow, setListToShow] = useState<ClassificatoryData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const [eventInfoData, setEventInfoData] = useState<EventDetailsClassificatory | null>(
    {} as EventDetailsClassificatory
  );

  const handleGetResultsClassificatory = useCallback(async () => {
    if (!prove_event_id) {
      return;
    }

    const data = await getClassificatory({
      prove_event_id: Number(prove_event_id),
    });

    console.log('Classificatory data:', data.lista_classificacao);

    setAllList(data.lista_classificacao);
    setListToShow(data.lista_classificacao);

    // setEventInfoData(data.detalhe_evento);
    setIsLoading(false);
  }, [getClassificatory, prove_event_id]);

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  // // Effect to filter the list based on searchValue
  // useEffect(() => {
  //   console.log('Search Value:', searchValue);

  //   if (searchValue.trim() === '') {
  //     setListToShow(allList);
  //     return;
  //   }

  //   const filteredList = allList.filter(
  //     (item) =>
  //       item.cds_nome_competidor.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.cds_nome_animal.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.proprietario.includes(searchValue) ||
  //       item.cds_pontuacao.includes(searchValue)
  //   );

  //   setListToShow(filteredList);
  // }, [searchValue, allList]);

  useEffect(() => {
    handleGetResultsClassificatory();
  }, [handleGetResultsClassificatory]);

  const columns: Array<TableColumnSEQM> = [
    {
      key: 'nucleo',
      label: 'Núcleo',
      width: '3%',
      align: 'center',
    },
    {
      key: 'abqm',
      label: 'ABQM',
      width: '3%',
      // textBold: true,
      align: 'center',
    },
    {
      key: 'competidor',
      label: 'Competidor',
      width: '90%',
      align: 'left',
    },
  ];

  const data: Array<TableRowSEQM> = listToShow.map((item) => ({
    nucleo: { value: item.cds_classificacao },
    abqm: { value: item.cds_classificacao },
    competidor: {
      render: () => {
        return (
          <Text fontSize="xs" fontWeight="semiBold" color={colors.emeraldGreen75}>
            {item.equipe.map((e) => e.cds_competidor).join(', ')}
          </Text>
        );
      },
    },
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

export default Classificatory;
