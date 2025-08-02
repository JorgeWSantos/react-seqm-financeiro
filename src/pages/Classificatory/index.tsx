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
import { useParams } from 'react-router';
import Layout from '@src/Layout';
import AnimalTableData from './AnimalTableData';
import { CompetitorTableData } from './CompetitorTableData';
import { OwnerTableData } from './OwnerTableData';

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

    setAllList([...data, ...data, ...data]);
    setListToShow([...data, ...data, ...data]); // Duplicating for testing purposes

    const detalhedoevento = {
      bid_oficial: true,
      cds_evento: 'MOCK - 1° Festival ABQM Jovem 2025',
      data_fim: 'MOCK - 18/01/2025',
      data_inicio: 'MOCK - 09/01/2025',
      estado: 'MOCK - SP',
      local: 'MOCK - Haras Raphaela',
      logotipo: 'https://img.seqm.com.br/saep/PRD/logotipo/6386899376395470251.png',
      nid_agrupa_evento: 39374,
      organizador:
        'MOCK - ABQM - Associação Brasileira de Criadores de Cavalo Quarto de Milha',
    };

    // setEventInfoData(data.detalhe_evento);
    setEventInfoData(detalhedoevento);
    setIsLoading(false);
  }, [getClassificatory, prove_event_id]);

  const handleOnGoBack = useCallback(() => {
    navigate('/modalidade/' + prove_id + '/evento/' + event_id);
  }, [event_id, navigate, prove_id]);

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const filteredList = allList.filter((item) =>
      item.cds_classificacao.toLowerCase().includes(searchValue.toLowerCase())
    );

    setListToShow(filteredList);
  }, [searchValue, allList]);

  useEffect(() => {
    handleGetResultsClassificatory();
  }, [handleGetResultsClassificatory]);

  const columns: Array<TableColumnSEQM> = [
    // {
    //   key: 'nucleo',
    //   label: 'NÚCLEO',
    //   width: '4%',
    //   minWidth: '3rem',
    //   align: 'center',
    // },
    {
      key: 'abqm',
      label: 'ABQM',
      width: '5%',
      minWidth: '2.5rem',
      align: 'center',
    },
    {
      key: 'competitor',
      label: 'COMPETIDOR',
      width: '30%',
      align: 'left',
    },
    {
      key: 'animal',
      label: 'ANIMAL',
      width: '27%',
      align: 'left',
    },
    {
      key: 'owner',
      label: 'PROPRIETÁRIO',
      width: '30%',
      align: 'left',
    },
    {
      key: 'tn',
      label: 'T/N',
      width: '5%',
      align: 'center',
    },
  ];

  const data: Array<TableRowSEQM> = listToShow.map((item) => ({
    nucleo: { value: item.cds_classificacao },
    abqm: { value: `${item.cds_classificacao + (item.cds_classificacao ? '°' : '')}` },
    competitor: {
      render: () => {
        return item.equipe.map((e) => <CompetitorTableData value={e.cds_competidor} />);
      },
    },
    animal: {
      render: () => {
        return (
          <>
            {item.equipe.map((e) => (
              <AnimalTableData
                idAnimal={e.nid_animal}
                nameAnimal={e.cds_animal}
                imgAnimal={e.img_animal}
                isHallOfFameAnimal={e.hall_da_fama}
                // isHallOfFameAnimal={e.hall_da_fama || (i === 0 ? '2017' : null)}
                medal={e.cor_medalha}
                registerAnimal={'P000000'}
              />
            ))}
          </>
        );
      },
    },
    owner: {
      render: () => {
        return item.equipe.map((e) => (
          <OwnerTableData
            // isHallOfFameOwner={e.proprietario_hf || (i === 0 ? '2017' : null)}
            isHallOfFameOwner={e.proprietario_hf}
            value={e.cds_proprietario}
          />
        ));
      },
    },
    tn: { value: item.cds_media },
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
                subtitle={eventInfoData?.data_inicio || ''}
                hasBackButton
                onGoBack={handleOnGoBack}
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
              overflow: 'visible',
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
              overflow: 'visible',
            }}
            headerMobileNavigator={
              <HeaderMobileNavigator
                hasBackButton
                onGoBack={handleOnGoBack}
                headingText={getNameProveById(Number(prove_id))}
                hasSearch
                onChangeSearch={(v) => setSearchValue(v.target.value)}
              />
            }
          >
            <Scrollable>
              {data.length > 0 ? (
                <TableSEQM data={data} columns={columns} width={'60rem'} />
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
