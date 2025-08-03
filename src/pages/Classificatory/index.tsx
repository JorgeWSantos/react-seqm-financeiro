import {
  ActivityIndicator,
  AnimalTableData,
  CompetitorTableData,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  OwnerTableData,
  ShareOptions,
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
import { PrinterIcon, SearchIcon, ShareIcon, StarIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useClassificatory } from '@src/services/useClassificatory';
import type { ClassificatoryData } from './types.classificatory.api';
import { useParams } from 'react-router';
import Layout from '@src/Layout';
import type { ClassificatoryEventData, ClassificatoryInscriptionsResumeData } from './types.event-details.api';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import PrintArea from '@src/components/PrintArea';
import { handlePrintPDF } from '@src/components/PrintArea/utils';

function Classificatory() {
  const params = useParams();
  const { prove_id, prove_event_id, event_id, id_classificatory } = params;

  const pageTitle = 'Resultados »';
  const subTitle = getNameProveById(Number(prove_id));

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getClassificatory, getEventDetails } = useClassificatory();
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState<ClassificatoryData[]>([]);
  const [listToShow, setListToShow] = useState<ClassificatoryData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const [eventInfoData, setEventInfoData] = useState<ClassificatoryEventData | null>(
    {} as ClassificatoryEventData
  );

  const [resumeInscriptionsData, setResumeInscriptionsData] =
    useState<ClassificatoryInscriptionsResumeData | null>({} as ClassificatoryInscriptionsResumeData);

  const [judmentCard, setJudgmentCard] = useState<string>('');

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;


  const handleGetResultsClassificatory = useCallback(async () => {
    if (!prove_event_id) {
      return;
    }

    const data = await getClassificatory({
      prove_event_id: Number(prove_event_id),
    });

    setAllList(data);
    setListToShow(data); // Duplicating for testing purposes

    setIsLoading(false);
  }, [getClassificatory, prove_event_id]);

  const handleGetEventDetails = useCallback(async () => {
    if (!prove_event_id || !id_classificatory) {
      return;
    }

    const { detalhe_evento, resumo_inscricoes, cartao_julgamento } =
      await getEventDetails({
        prove_event_id: Number(prove_event_id),
        prove_event_classificatory_id: Number(id_classificatory),
      });

    if (detalhe_evento) {
      setEventInfoData(detalhe_evento);
    }

    if (resumo_inscricoes) {
      setResumeInscriptionsData(resumo_inscricoes);
    }

    if (cartao_julgamento) {
      setJudgmentCard(cartao_julgamento);
    }

    setIsLoading(false);
  }, [getEventDetails, prove_event_id, id_classificatory]);

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
    handleGetEventDetails();
  }, [handleGetResultsClassificatory, handleGetEventDetails]);

  const tableColumns: Array<TableColumnSEQM> = [
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
      width: '36%',
      align: 'left',
    },
    {
      key: 'tn',
      label: 'T/N',
      width: '8%',
      align: 'center',
    },
  ];

  const tableData: Array<TableRowSEQM> = listToShow.map((item) => ({
    nucleo: { value: item.cds_classificacao },
    abqm: { value: `${item.cds_classificacao + (item.cds_classificacao ? '°' : '')}` },
    competitor: {
      render: () => {
        return item.equipe.map((e) => <CompetitorTableData key={e.nid_competidor} value={e.cds_competidor} />);
      },
    },
    animal: {
      render: () => {
        return (
          item.equipe.map((e) => (
              <AnimalTableData
                key={e.nid_animal}
                idAnimal={e.nid_animal}
                nameAnimal={e.cds_animal}
                imgAnimal={e.img_animal}
                isHallOfFameAnimal={e.hall_da_fama}
                // isHallOfFameAnimal={'2014'}
                // isHallOfFameAnimal={e.hall_da_fama || (i === 0 ? '2017' : null)}
                medal={e.cor_medalha}
                registerAnimal={'P000000'}
              />
            ))
        );
      },
    },
    owner: {
      render: () => {
        return item.equipe.map((e) => (
          <OwnerTableData
            key={e.cds_proprietario}
            // isHallOfFameOwner={e.proprietario_hf || (i === 0 ? '2017' : null)}
            isHallOfFameOwner={e.proprietario_hf}
            value={e.cds_proprietario}
          />
        ));
      },
    },
    tn: { value: item.cds_media },
  }));

  const printCards = [
    {
      title: 'DATA DO EVENTO',
      value: eventInfoData?.dtm_data_prova?.slice(0, 10) || '',
    },
    {
      title: 'INSCRIÇÕES',
      value: resumeInscriptionsData?.nnr_qtde_inscricoes || 0,
    },
    {
      title: 'COMPETIDORES',
      value: resumeInscriptionsData?.nnr_qtde_competidores || 0,
    },
    {
      title: 'ANIMAIS',
      value: resumeInscriptionsData?.nnr_qtde_animais || 0,
    },
  ];

  const printInfo: PrintHeaderProps = {
    eventName: eventInfoData?.cds_evento || '',
    responsibleName: 'MOCK DATA ORGANIZADOR',
    city: 'MOCK DATA LOCAL',
    state: 'MOCK DATA ESTADO',
    startDate: 'MOCK DATA DATA INICIO',
    endDate: 'MOCK DATA DATA FIM',
    modalityName: getNameProveById(Number(prove_id)) || '',
  };

  const buttonsHeader = [
    {
      icon: <StarIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />,
      label: 'participações',
      onClick: () => {
        window.open(
          import.meta.env.VITE_URL_PARTICIPACOES +
            '/index/' +
            eventInfoData?.nid_agrupa_evento
        );
      },
    },
    {
      icon: (
        <PrinterIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
      ),
      label: 'imprimir',
      onClick: handlePrintPDF,
    },
    {
      icon: (
        <ShareIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
      ),
      label: 'compartilhar',
      onClick: () => setShowShareOptions((prev) => !prev),
      isActive: showShareOptions,
      showOptionsToShare: {
        show: showShareOptions,
        children: <ShareOptions url={shareUrl} />,
      },
    },
  ];


  console.log('eventInfoData', eventInfoData);

  return (
    <Layout>
      <ContainerMain>
        {!isTabletOrMobile ? (
          <ContentDektop
            header={<Header text={pageTitle} subTitle={subTitle} buttons={buttonsHeader} />}
            headerNavigator={
              <HeaderNavigatorDesktop
                title={eventInfoData?.cds_modalidade || ''}
                subtitle={eventInfoData?.cds_evento || ''}
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
            count={tableData.length}
          >
            <Scrollable>
              {tableData.length > 0 ? (
                <TableSEQM data={tableData} columns={tableColumns} />
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
              {tableData.length > 0 ? (
                <TableSEQM data={tableData} columns={tableColumns} width={'64rem'} />
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

        {tableData?.length > 0 && (
          <PrintArea
            title={'RESULTADOS DO EVENTO'}
            columns={tableColumns}
            data={tableData}
            cards={printCards}
            info={printInfo}
          />
        )}
        {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}

      </ContainerMain>
    </Layout>
  );
}

export default Classificatory;
