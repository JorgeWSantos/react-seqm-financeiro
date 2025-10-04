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
  TableWithLoader,
  StyledTableSEQMTextTd,
  TabsCardsBar,
  Switch,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ContainerMain,
  TitleAndCards,
  StyledTextEvent,
  StyledTextModality,
  ContainerMobileMain,
  StyledTdSpanClassD,
  StyledTdTextClassD,
  StyledDivClassD,
  DivCompetitor,
  ContentTabs,
  ContentSwitchTabs,
  RemoveScrollableMobile,
} from './styles';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import {
  AbqmOficialColoredIconSEQM,
  FileTextIcon,
  PrinterIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
} from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useClassificatory } from '@src/services/Classificatory/useClassificatory';
import type { ClassificatoryData } from '@src/services/Classificatory/types.classificatory.api';
import { useParams } from 'react-router';
import type {
  ClassificatoryEventData,
  ClassificatoryInscriptionsResumeData,
  ClassificatoryJudgmentCardData,
} from '@src/services/Classificatory/types.event-details.api';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import PrintArea from '@src/components/PrintArea';
import { convertToBrazilDate } from '@src/utils/formatDate';
import type { InfoEventData } from '@src/services/General/types.info-event.api';
import { useInfoEvent } from '@src/services/General/useInfoEvent';
import { InfoCardsGroup } from './InfoCards';
import type { Tab } from './types';
import { urlConsultaAnimal, urlRanking } from '@src/config/env';
import { getClassDValueToSort } from './helper';

const Classificatory = () => {
  const params = useParams();
  const { prove_id, prove_event_id, event_id, id_classificatory } = params;

  const pageTitle = 'Resultados';
  const subTitle = '';

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

  const [switchCore, setSwitchCore] = useState({
    checked: false,
    onChange: (v: any) => {
      console.log(v);
    },
    label: 'Núcleos',
  });

  const [switchAQHA, setSwitchAQHA] = useState({
    checked: false,
    onChange: (v: any) => {
      console.log(v);
    },
    label: 'AQHA',
  });

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

  const [judgmentCards, setJudgmentCards] =
    useState<ClassificatoryJudgmentCardData | null>(null);

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

    const { detalhe_evento, resumo_inscricoes, cartao_julgamento } =
      await getEventDetails({
        prove_event_id: Number(prove_event_id),
        prove_event_classificatory_id: Number(id_classificatory),
      });

    if (detalhe_evento) {
      setClassificatoryEventInfoData(detalhe_evento);
    }

    if (resumo_inscricoes) {
      setResumeInscriptionsData(resumo_inscricoes);
    }

    if (
      cartao_julgamento !== null &&
      (cartao_julgamento.cds_url_cartao_julgamento_classificatoria !== '' ||
        cartao_julgamento.cds_url_cartao_julgamento_final !== '')
    ) {
      setJudgmentCards({
        cds_url_cartao_julgamento_classificatoria:
          cartao_julgamento.cds_url_cartao_julgamento_classificatoria,
        cds_url_cartao_julgamento_final:
          cartao_julgamento.cds_url_cartao_julgamento_final,
      });
    }
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
    navigate(-1);
  }, [navigate]);

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

    console.log('!switchCore.checked', !switchCore.checked);
    console.log('!switchAQHA.checked', !switchAQHA.checked);
    console.log('searchValue.trim() === ""', searchValue.trim() === '');

    if (searchValue.trim() === '' && !switchCore.checked && !switchAQHA.checked) {
      setListToShow(allList);
      return;
    }

    const search = searchValue.toLowerCase();

    const filteredList = allList.filter((item) => {
      // Filtro por classificação
      const matchClassificacao = item.cds_classificacao.toLowerCase().includes(search);
      const matchTN = item.cds_media.toLowerCase().includes(search);
      const matchCore = switchCore.checked ? item.cds_classificacao_nucleo !== '' : true;
      const matchAQHA = switchAQHA.checked
        ? item.bid_nucleo_participa_abqm === true
        : true;

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
        matchCore &&
        matchAQHA &&
        (matchClassificacao || matchAnimal || matchCompetitor || matchOwner || matchTN)
      );
    });

    console.log('filteredList', filteredList);

    setListToShow(filteredList);
  }, [activeTab, searchValue, tabsToShow, switchAQHA, switchCore]);

  useEffect(() => {
    handleGetResultsClassificatory();
    handleGetEventDetails();
  }, [handleGetResultsClassificatory, handleGetEventDetails]);

  const hasNucleoColumn = listToShow.findIndex(
    (item) => item.cds_classificacao_nucleo !== ''
  );

  // const hasAQHA = listToShow.findIndex((item) => item.bid_aqha);
  const hasClassD = listToShow.findIndex((item) => item.cds_classificacao_d !== '');
  const hasABQMParticipation = listToShow.findIndex(
    (item) => item.bid_nucleo_participa_abqm === true
  );

  const lastSortable = (item: ClassificatoryData) => {
    if (item.cds_media_final === 'SAT') {
      return 99999;
    }
    if (item.cds_media_final === 'N/C') {
      return 9999;
    }

    return 999;
  };

  const tableColumns: Array<TableColumnSEQM> = [
    ...((hasNucleoColumn !== -1
      ? [
          {
            key: 'nucleo',
            label: 'NÚCLEO',
            minWidth: '4.5rem',
            align: 'center',
            sortable: true,
          },
        ]
      : []) as Array<TableColumnSEQM>),
    {
      key: 'abqm',
      label: 'ABQM',
      minWidth: '4.2rem',
      align: 'center',
      sortable: true,
    },
    ...((hasClassD !== -1
      ? [
          {
            key: 'classd',
            label: 'CLASS',
            width: '4rem',
            align: 'center',
            sortable: true,
          },
        ]
      : []) as Array<TableColumnSEQM>),
    {
      key: 'spacer',
      label: '',
      width: '0.5rem',
      align: 'left',
    },
    {
      key: 'competitor',
      label: 'COMPETIDOR',
      align: 'left',
      sortable: true,
    },
    {
      key: 'animal',
      label: 'ANIMAL',
      align: 'left',
      sortable: true,
    },
    {
      key: 'owner',
      label: 'PROPRIETÁRIO',
      align: 'left',
      sortable: true,
    },
    {
      key: 'auto',
      label: '',
      width: '100%',
      align: 'left',
    },
    {
      key: 'tn',
      label: 'T/N',
      align: 'left',
      sortable: true,
    },
  ];

  const tableData: Array<TableRowSEQM> = listToShow.map((item) => ({
    nucleo: {
      valueToSort: item.cds_classificacao_nucleo
        ? Number(item.cds_classificacao_nucleo)
        : lastSortable(item),
      value: `${
        item.cds_classificacao_nucleo + (item.cds_classificacao_nucleo ? '°' : '')
      }`,
    },
    abqm: { value: `${item.cds_classificacao + (item.cds_classificacao ? '°' : '')}` },
    classd: {
      valueToSort: getClassDValueToSort(item.cds_classificacao_d),
      value: item.cds_classificacao_d
        ? `${item.cds_classificacao_d}`
        : lastSortable(item),
      // render: () => render1(item),
      render: () => (
        <>
          {item.cds_classificacao_d && (
            <StyledDivClassD>
              <StyledTableSEQMTextTd>
                {item.cds_classificacao_d.split('-')[1]}°
              </StyledTableSEQMTextTd>
              <StyledTdTextClassD>
                {item.cds_classificacao_d.split('-')[0][1]}
              </StyledTdTextClassD>
              <StyledTdSpanClassD>
                {/* {item.cds_classificacao_d.split('-')[0][0]} */}
                {item.cds_classificacao_d.split('-')[0][0]}
                {/* + item.cds_classificacao_d.split('-')[1]} */}
              </StyledTdSpanClassD>
            </StyledDivClassD>
          )}
        </>
      ),
    },
    spacer: {
      value: '',
    },
    competitor: {
      value: item.equipe[0]?.cds_competidor || '', // to sort
      render: () => {
        return item.equipe.map((e, i) => (
          <DivCompetitor>
            {hasNucleoColumn !== -1 && item.bid_nucleo_participa_abqm === true && (
              <AbqmOficialColoredIconSEQM width={11} height={11} />
            )}
            <CompetitorTableData
              key={new Date().getTime() + i}
              value={e.cds_competidor}
              onClick={() => {
                window.location.href =
                  urlRanking + `/competidor/detalhe/${e.nid_competidor}`;
              }}
            />
          </DivCompetitor>
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
            registerAnimal={e.cds_registro_animal}
            isHallOfFameAnimal={e.hall_da_fama}
            onClick={() => {
              window.location.href =
                urlConsultaAnimal + `/perfil-do-animal/campanha/${e.nid_animal}`;
            }}
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
            isHallOfFameOwner={e.proprietario_hf}
            value={e.cds_proprietario}
            onClick={() => {
              window.location.href =
                urlRanking + `/proprietario/detalhe/${e.nid_proprietario}`;
            }}
          />
        ));
      },
    },
    auto: {
      value: '',
    },
    tn: { value: item.cds_media_final },
    isoficial: {
      value: hasNucleoColumn !== -1 && item.bid_nucleo_participa_abqm === true,
    },
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
      icon: <StarIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75} />,
      label: 'participações',
      onClick: () => {
        window.open(
          import.meta.env.VITE_URL_PARTICIPACOES +
            '/index/' +
            classificatoryEventInfoData?.nid_agrupa_evento
        );
      },
    },
    ...(judgmentCards !== null &&
    (judgmentCards.cds_url_cartao_julgamento_classificatoria !== '' ||
      judgmentCards.cds_url_cartao_julgamento_final !== '')
      ? [
          {
            icon: (
              <FileTextIcon
                fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75}
              />
            ),
            label: 'cartão de julgamento',
            onClick: () => {
              if (
                activeTab === 'Classificatória' &&
                judgmentCards.cds_url_cartao_julgamento_classificatoria !== ''
              ) {
                window.open(judgmentCards.cds_url_cartao_julgamento_classificatoria);
                return;
              }

              window.open(judgmentCards.cds_url_cartao_julgamento_final);
            },
          },
        ]
      : []),
    {
      icon: (
        <PrinterIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75} />
      ),
      label: 'imprimir',
      onClick: onTriggerPrintPDF,
    },
    {
      icon: (
        <ShareIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75} />
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
      <ContainerMobileMain>
        <ContentMobile
          style={{
            maxWidth: '100vw',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '0',
          }}
          contentMobileBoxStyles={{
            gap: '0.5rem',
            padding: '1.5rem 0rem 0rem 0rem',
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
          <TitleAndCards>
            <StyledTextModality
              fontSize="xl"
              fontWeight="semiBold"
              lineHeight="tight"
              color={colors.white85}
            >
              {classificatoryEventInfoData?.cds_modalidade || ''}
            </StyledTextModality>

            <StyledTextEvent
              fontSize="xl"
              fontWeight="regular"
              lineHeight="tight"
              color={colors.green900}
            >
              {classificatoryEventInfoData?.cds_evento || ''}
            </StyledTextEvent>

            <InfoCardsGroup
              qtde_animals={resumeInscriptionsData?.nnr_qtde_animais?.toString() || '-'}
              qtde_competitors={
                resumeInscriptionsData?.nnr_qtde_competidores?.toString() || '-'
              }
              qtde_inscriptions={
                resumeInscriptionsData?.nnr_qtde_inscricoes?.toString() || '-'
              }
              premiation_value={null}
              dt_prove={null}
            />

            <TabsCardsBar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
              }}
              tabs={
                tabsToShow.length === 0
                  ? []
                  : tabsToShow.map((tab) => ({
                      label: tab.tipo_etapa,
                      value: tab.tipo_etapa,
                    }))
              }
              hideAutoWidthElement={hasNucleoColumn !== -1 && hasABQMParticipation !== -1}
            >
              <ContentTabs>
                {hasNucleoColumn !== -1 && hasABQMParticipation !== -1 && (
                  <ContentSwitchTabs>
                    <Switch
                      checked={switchCore.checked}
                      onChange={() =>
                        setSwitchCore({ ...switchCore, checked: !switchCore.checked })
                      }
                      label={switchCore.label}
                    />
                    <Switch
                      checked={switchAQHA.checked}
                      onChange={() =>
                        setSwitchAQHA({ ...switchAQHA, checked: !switchAQHA.checked })
                      }
                      label={switchAQHA.label}
                    />
                  </ContentSwitchTabs>
                )}
              </ContentTabs>
            </TabsCardsBar>
          </TitleAndCards>

          <RemoveScrollableMobile>
            <TableWithLoader
              data={tableData}
              columns={tableColumns}
              isLoading={isLoading}
            />
          </RemoveScrollableMobile>
        </ContentMobile>

        {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
      </ContainerMobileMain>
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={pageTitle} subTitle={subTitle} buttons={buttonsHeader} />}
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        count={tableData.length}
      >
        <HeaderNavigatorDesktop
          title={classificatoryEventInfoData?.cds_modalidade?.toUpperCase() || ''}
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

        <TabsCardsBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
          }}
          tabs={
            tabsToShow.length === 0
              ? []
              : tabsToShow.map((tab) => ({
                  label: tab.tipo_etapa,
                  value: tab.tipo_etapa,
                }))
          }
          hideAutoWidthElement={hasNucleoColumn !== -1 && hasABQMParticipation !== -1}
        >
          <ContentTabs>
            {hasNucleoColumn !== -1 && hasABQMParticipation !== -1 && (
              <ContentSwitchTabs>
                <Switch
                  checked={switchCore.checked}
                  onChange={() =>
                    setSwitchCore({ ...switchCore, checked: !switchCore.checked })
                  }
                  label={switchCore.label}
                />
                <Switch
                  checked={switchAQHA.checked}
                  onChange={() =>
                    setSwitchAQHA({ ...switchAQHA, checked: !switchAQHA.checked })
                  }
                  label={switchAQHA.label}
                />
              </ContentSwitchTabs>
            )}

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
          </ContentTabs>
        </TabsCardsBar>

        <TableWithLoader
          data={tableData}
          columns={tableColumns}
          isLoading={isLoading}
          minWidthTable="100%"
        />
      </ContentDektop>

      {tableData?.length > 0 && (
        <PrintArea
          ref={printAreaRef}
          title={'RESULTADOS DO EVENTO'}
          columns={tableColumns}
          data={tableData}
          cards={printCards}
          info={printInfo}
          totalForPage={
            listToShow[0].equipe.length === 1
              ? 17
              : listToShow[0].equipe.length > 2
              ? 7
              : 9
          }
        />
      )}
      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
};

export default Classificatory;
