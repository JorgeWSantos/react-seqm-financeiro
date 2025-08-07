import {
  AnimalTableData,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  OwnerTableData,
  ShareOptions,
  TextInput,
  type TableColumnSEQM,
  CompetitorTableData,
  type TableRowSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain, Scrollable, TabAndCards } from './styles';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { PrinterIcon, SearchIcon, ShareIcon, StarIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useClassificatory } from '@src/services/Classificatory/useClassificatory';
import type { ClassificatoryData } from '../../services/Classificatory/types.classificatory.api';
import { useParams } from 'react-router';
import type {
  ClassificatoryEventData,
  ClassificatoryInscriptionsResumeData,
} from '../../services/Classificatory/types.event-details.api';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import PrintArea from '@src/components/PrintArea';
import TableWithLoader from '@src/components/EventSummary/TableWithLoader';
import { convertToBrazilDate } from '@src/utils/formatDate';
import TabOption from '@src/components/Classificatory/TabOption';
import type { InfoEventData } from '@src/services/General/types.info-event.api';
import { useInfoEvent } from '@src/services/General/useInfoEvent';
import { InfoCardsGroup } from './InfoCards';
import type { Tab } from './types';

const Classificatory = () => {
  const params = useParams();
  const { prove_id, prove_event_id, event_id, id_classificatory } = params;

  const pageTitle = 'Resultados »';
  const subTitle = getNameProveById(Number(prove_id));

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getClassificatory, getEventDetails } = useClassificatory();
  const { getInfoEvent } = useInfoEvent();

  const [isLoading, setIsLoading] = useState(true);
  // const [allList, setAllList] = useState<ClassificatoryData[]>([]);
  const [listToShow, setListToShow] = useState<ClassificatoryData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tabsToShow, setTabsToShow] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');

  // Ref para acessar o método print do PrintArea
  const printAreaRef = useRef<{ print: () => void }>(null);

  const [classificatoryEventInfoData, setClassificatoryEventInfoData] =
    useState<ClassificatoryEventData | null>({} as ClassificatoryEventData);

  const [eventInfoData, setEventInfoData] = useState<InfoEventData | null>(
    {} as InfoEventData
  );

  const [resumeInscriptionsData, setResumeInscriptionsData] =
    useState<ClassificatoryInscriptionsResumeData | null>(
      {} as ClassificatoryInscriptionsResumeData
    );

  // const [judmentCard, setJudgmentCard] = useState<string>('');

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  //functions
  const handleGetResultsClassificatory = useCallback(async () => {
    if (!prove_event_id) {
      return;
    }

    const data = await getClassificatory({
      prove_event_id: Number(prove_event_id),
    });

    if (data.length > 0) {
      const _tabs: Tab[] = [];

      data.map((item) => {
        _tabs.push({
          tipo_etapa: item.tipo_etapa,
          cartao_julgamento: item.cartao_julgamento,
          lista_classificacao: item.lista_classificacao,
        } as Tab);
      });

      console.log('Tabs:', _tabs);

      setActiveTab(_tabs[0]?.tipo_etapa || '');
      setTabsToShow(_tabs);
    }

    // setAllList(data[0]?.lista_classificacao || []);
    setListToShow(data[0]?.lista_classificacao || []);

    setIsLoading(false);
  }, [getClassificatory, prove_event_id]);

  const handleGetEventDetails = useCallback(async () => {
    if (!prove_event_id || !id_classificatory) {
      return;
    }

    const { detalhe_evento, resumo_inscricoes } = await getEventDetails({
      prove_event_id: Number(prove_event_id),
      prove_event_classificatory_id: Number(id_classificatory),
    });

    if (detalhe_evento) {
      setClassificatoryEventInfoData(detalhe_evento);
    }

    if (resumo_inscricoes) {
      setResumeInscriptionsData(resumo_inscricoes);
    }

    // if (cartao_julgamento) {
    //   setJudgmentCard(cartao_julgamento);
    // }
  }, [getEventDetails, prove_event_id, id_classificatory]);

  const handleGetEventInfo = useCallback(async () => {
    if (!event_id) {
      return;
    }

    const data = await getInfoEvent({
      event_id: Number(event_id),
    });

    setEventInfoData(data);
  }, [getInfoEvent, event_id]);

  const handleOnGoBack = useCallback(() => {
    navigate('/modalidade/' + prove_id + '/evento/' + event_id);
  }, [event_id, navigate, prove_id]);

  const onTriggerPrintPDF = useCallback(async () => {
    await handleGetEventInfo();
    setTimeout(() => {
      printAreaRef.current?.print();
    }, 1000);
  }, [handleGetEventInfo]);

  // Effect to set the page title and path

  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  useEffect(() => {
    let allList: ClassificatoryData[] = [];

    if (tabsToShow.length > 0) {
      allList =
        tabsToShow.filter((item) => item.tipo_etapa === activeTab)[0]
          .lista_classificacao || [];
    }

    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const search = searchValue.toLowerCase();

    const filteredList = allList.filter((item) => {
      // Filtro por classificação
      const matchClassificacao = item.cds_classificacao.toLowerCase().includes(search);
      const matchTN = item.cds_media.toLowerCase().includes(search);

      // Filtro por nome do animal dentro de equipe
      const matchAnimal = item.equipe?.some((e) =>
        e.cds_animal?.toLowerCase().includes(search)
      );
      // Filtro por nome do competidor dentro de equipe
      const matchCompetitor = item.equipe?.some((e) =>
        e.cds_competidor?.toLowerCase().includes(search)
      );
      // Filtro por nome do proprietario dentro de equipe
      const matchOwner = item.equipe?.some((e) =>
        e.cds_proprietario?.toLowerCase().includes(search)
      );

      return (
        matchClassificacao || matchAnimal || matchCompetitor || matchOwner || matchTN
      );
    });

    setListToShow(filteredList);
  }, [activeTab, searchValue, tabsToShow]);

  useEffect(() => {
    handleGetResultsClassificatory();
    handleGetEventDetails();
  }, [handleGetResultsClassificatory, handleGetEventDetails]);

  const hasNucleoColumn = listToShow.findIndex(
    (item) => item.cds_classificacao_nucleo !== ''
  );

  const tableColumns: Array<TableColumnSEQM> = [
    ...(hasNucleoColumn !== -1
      ? [
          {
            key: 'nucleo',
            label: 'NÚCLEO',
            width: '6%',
            minWidth: '3rem',
            align: 'center' as const,
          },
        ]
      : []),
    {
      key: 'abqm',
      label: 'ABQM',
      width: '6%',
      minWidth: '2.5rem',
      align: 'center',
      sortable: true,
    },
    {
      key: 'competitor',
      label: 'COMPETIDOR',
      width: '30%',
      align: 'left',
      sortable: true,
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
      width: '9%',
      align: 'left',
      sortable: true,
    },
  ];

  const tableData: Array<TableRowSEQM> = listToShow.map((item) => ({
    nucleo: { value: item.cds_classificacao_nucleo || ' ' },
    abqm: { value: `${item.cds_classificacao + (item.cds_classificacao ? '°' : '')}` },
    competitor: {
      value: item.equipe[0]?.cds_competidor || '', // to sort
      render: () => {
        return item.equipe.map((e, i) => (
          <CompetitorTableData key={new Date().getTime() + i} value={e.cds_competidor} />
        ));
      },
    },
    animal: {
      value: item.equipe[0]?.cds_animal || '', // to sort
      render: () => {
        return item.equipe.map((e, i) => (
          <AnimalTableData
            key={new Date().getTime() + i}
            idAnimal={e.nid_animal}
            nameAnimal={e.cds_animal}
            imgAnimal={e.img_animal}
            registerOfMerity={e.registro_de_merito}
            modalityAwards={e.modalidades_awards}
            superHorseAward={e.super_horse}
            allAroundAmateur={e.all_around_amador}
            allAroundYoung={e.all_around_jovem}
            rankingGeneralAward={e.ranking_geral_awards}
            medal={e.cor_medalha}
            registerAnimal={'P000000'}
            isHallOfFameAnimal={e.hall_da_fama}
            // isHallOfFameAnimal={e.hall_da_fama || (i === 0 ? '2017' : null)}
            // isHallOfFameAnimal={'2014'}
          />
        ));
      },
    },
    owner: {
      value: item.equipe[0]?.cds_proprietario || '', // to sort
      render: () => {
        return item.equipe.map((e, i) => (
          <OwnerTableData
            key={new Date().getTime() + i}
            // isHallOfFameOwner={e.proprietario_hf || (i === 0 ? '2017' : null)}
            isHallOfFameOwner={e.proprietario_hf}
            value={e.cds_proprietario}
          />
        ));
      },
    },
    tn: { value: item.cds_media_final },
  }));

  const printCards = [
    {
      title: 'DATA DO EVENTO',
      value:
        convertToBrazilDate(classificatoryEventInfoData?.dtm_data_prova || '') || '0',
    },
    {
      title: 'INSCRIÇÕES',
      value: resumeInscriptionsData?.nnr_qtde_inscricoes?.toString() || '0',
    },
    {
      title: 'COMPETIDORES',
      value: resumeInscriptionsData?.nnr_qtde_competidores?.toString() || '0',
    },
    {
      title: 'ANIMAIS',
      value: resumeInscriptionsData?.nnr_qtde_animais?.toString() || '0',
    },
  ];

  const printInfo: PrintHeaderProps = {
    eventName: eventInfoData?.cds_evento || '',
    responsibleName: eventInfoData?.organizador || '',
    city: eventInfoData?.local || '',
    state: eventInfoData?.estado || '',
    startDate: eventInfoData?.data_inicio || '',
    endDate: eventInfoData?.data_fim || '',
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
            classificatoryEventInfoData?.nid_agrupa_evento
        );
      },
    },
    {
      icon: (
        <PrinterIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
      ),
      label: 'imprimir',
      onClick: onTriggerPrintPDF,
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

  if (isTabletOrMobile) {
    return (
      <ContainerMain>
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
            <TableWithLoader
              data={tableData}
              columns={tableColumns}
              isLoading={isLoading}
              minWidthTable="62rem"
            />
          </Scrollable>
        </ContentMobile>

        {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
      </ContainerMain>
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={pageTitle} subTitle={subTitle} buttons={buttonsHeader} />}
        headerNavigator={
          <HeaderNavigatorDesktop
            title={classificatoryEventInfoData?.cds_modalidade || ''}
            subtitle={classificatoryEventInfoData?.cds_evento || ''}
            hasBackButton
            onGoBack={handleOnGoBack}
          >
            <TextInput
              placeholder="Buscar"
              onChange={(v) => setSearchValue(v.target.value)}
              icon={<SearchIcon fill={colors.white75} />}
              debounceDelay={1000}
            />
          </HeaderNavigatorDesktop>
        }
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        count={tableData.length}
      >
        <TabAndCards>
          <div className="empty">
            {tabsToShow.map((tab, index) => (
              <TabOption
                key={index}
                title={tab.tipo_etapa}
                active={activeTab === tab.tipo_etapa}
                onClick={() => setActiveTab(tab.tipo_etapa)}
              />
            ))}
          </div>

          <InfoCardsGroup
            qtde_animals={resumeInscriptionsData?.nnr_qtde_animais?.toString() || '-'}
            qtde_competitors={
              resumeInscriptionsData?.nnr_qtde_competidores?.toString() || '-'
            }
            qtde_inscriptions={
              resumeInscriptionsData?.nnr_qtde_inscricoes?.toString() || '-'
            }
            premiation_value={resumeInscriptionsData?.nvl_premiacao?.toString() || '-'}
            dt_prove={classificatoryEventInfoData?.dtm_data_prova?.toString() || ''}
          />
        </TabAndCards>

        <Scrollable>
          <TableWithLoader
            data={tableData}
            columns={tableColumns}
            isLoading={isLoading}
          />
        </Scrollable>
      </ContentDektop>

      {tableData?.length > 0 && (
        <PrintArea
          ref={printAreaRef}
          title={'RESULTADOS DO EVENTO'}
          columns={tableColumns}
          data={tableData}
          cards={printCards}
          info={printInfo}
          totalForPage={7}
        />
      )}
      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
};

export default Classificatory;
