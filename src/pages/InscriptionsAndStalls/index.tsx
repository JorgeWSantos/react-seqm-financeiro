import {
  ContentDektop,
  Header,
  HeaderNavigatorDesktop,
  ShareOptions,
  TextInput,
  type TableColumnSEQM,
  CompetitorTableData,
  type TableRowSEQM,
  TableWithLoader,
  TabsCardsBar,
  AnimalTableDataWithoutTooltip,
  formatToBRL,
  convertToBrazilDate,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain, DivCompetitor, ContentTabs, StyledTextTable } from './styles';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  CurrencyDollarIcon,
  PrinterIcon,
  SearchIcon,
  SpinnerRingResizeIcon,
} from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';

import { useParams } from 'react-router';

import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import PrintArea from '@src/components/PrintArea';
import type { Tab } from './types';
import { useInscriptionAndStalls } from '@src/services/InscriptionsAndStalls/useInscriptionsAndStalls';
import type { InscriptionData } from '@src/services/InscriptionsAndStalls/types.inscription.api';
import { InfoCardsGroup } from './InfoCards';
import { MobileInscriptionAndStalls } from './Mobile';
import type { StallsData } from '@src/services/InscriptionsAndStalls/types.stalls.api';

const InscriptionAndStalls = () => {
  const params = useParams();
  const { year, nid_group_event } = params;

  const pageTitle = 'Resultados';

  const { isTabletOrMobile } = useDeviceType();
  const { getInscriptions, getStalls } = useInscriptionAndStalls();

  const [pageName, setPageName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [listToShow, setListToShow] = useState<InscriptionData[] | StallsData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tabsToShow, setTabsToShow] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab['type']>('inscrições');
  const [sumTotalInscriptions, setSumTotalInscriptions] = useState<number>(0);
  const [sumTotalStalls, setSumTotalStalls] = useState<number>(0);

  // Ref para acessar o método print do PrintArea
  const printAreaRef = useRef<{ print: () => void }>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  //functions
  const handleGetResultsInscriptionAndStalls = useCallback(async () => {
    if (!nid_group_event || !year) {
      return;
    }

    const inscriptionsData = await getInscriptions({
      nid_group_event,
      year,
    });

    let sumInscriptions = 0;
    let sumStalls = 0;

    inscriptionsData.map((item) => {
      sumInscriptions += item.nrv_total_inscricao || 0;
    });

    const stallsData = await getStalls({
      nid_group_event,
      year,
    });

    stallsData.map((item) => {
      sumStalls += item.nnr_valor_baia || 0;
    });

    setPageName(inscriptionsData[0]?.cds_evento || '');

    if (inscriptionsData.length > 0) {
      const _tabs: Tab[] = [];

      _tabs.push({
        list: inscriptionsData || [],
        type: 'inscrições',
      });

      _tabs.push({
        list: stallsData || [],
        type: 'baias',
      });

      setActiveTab('inscrições');
      setTabsToShow(_tabs);
    }

    setSumTotalInscriptions(sumInscriptions);
    setSumTotalStalls(sumStalls);
    setListToShow(inscriptionsData);
    setIsLoading(false);
  }, [getInscriptions, getStalls, nid_group_event, year]);

  const handleOnGoBack = useCallback(() => {
    window.history.back();
  }, []);

  const onTriggerPrintPDF = useCallback(async () => {
    setIsPrinting(true);
    setTimeout(() => {
      printAreaRef.current?.print();
      setIsPrinting(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let allList: InscriptionData[] | StallsData[] = [];

    if (tabsToShow.length > 0) {
      allList = tabsToShow.filter((item) => item.type === activeTab)[0].list || [];
    }

    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const search = searchValue.toLowerCase();

    const filteredList = allList.filter((item) => {
      // Type guard for InscriptionData
      if ('cds_nome_competidor' in item) {
        // Filtro por classificação
        const matchClassificacao = item.nnr_classificacao_abqm
          .toString()
          .toLowerCase()
          .includes(search);
        const matchTN = item.cds_pontuacao?.toLowerCase().includes(search);

        // Filtro por nome do animal dentro de equipe
        const matchAnimal = item.cds_nome_animal.toLowerCase().includes(search);
        // Filtro por nome do competidor dentro de equipe
        const matchCompetitor = item.cds_nome_competidor.toLowerCase().includes(search);

        return matchClassificacao || matchAnimal || matchCompetitor || matchTN;
      }

      if ('cds_situacao_baia' in item) {
        // Filtro por nome do animal dentro de baia
        const matchAnimal = item.cds_nome_animal.toLowerCase().includes(search);

        return matchAnimal;
      }

      // If not InscriptionData, skip filtering (or add StallsData logic if needed)
      return false;
    });

    console.log('filteredList', filteredList);

    if (activeTab === 'inscrições') {
      setListToShow(filteredList as InscriptionData[]);
    } else {
      setListToShow(filteredList as StallsData[]);
    }
  }, [activeTab, searchValue, tabsToShow]);

  useEffect(() => {
    handleGetResultsInscriptionAndStalls();
  }, [handleGetResultsInscriptionAndStalls]);

  let tableColumnsIncriptions: Array<TableColumnSEQM> = [];
  let tableDataInscriptions: Array<TableRowSEQM> = [];

  let tableColumnsStalls: Array<TableColumnSEQM> = [];
  let tableDataStalls: Array<TableRowSEQM> = [];

  if (
    activeTab === 'inscrições' &&
    listToShow.length > 0 &&
    'cds_nome_competidor' in listToShow[0]
  ) {
    tableColumnsIncriptions = [
      {
        key: 'dt_prove',
        label: 'DT. PROVA',
        align: 'left',
        minWidth: '90px',
        sortable: true,
      },
      {
        key: 'event',
        label: 'EVENTO',
        align: 'left',
        minWidth: '180px',
        sortable: true,
      },
      {
        key: 'modality',
        label: 'MODALIDADE',
        align: 'left',
        minWidth: '110px',
        sortable: true,
      },
      {
        key: 'animal',
        label: 'ANIMAL',
        align: 'left',
        sortable: true,
      },
      {
        key: 'competitor',
        label: 'COMPETIDOR',
        align: 'left',
        minWidth: '200px',
        sortable: true,
      },
      {
        key: 'status',
        label: 'STATUS',
        align: 'left',
        sortable: true,
      },
      {
        key: 'aqha',
        label: 'AQHA',
        align: 'left',
        sortable: true,
      },
      {
        key: 'vlr_inscription',
        label: 'VALOR INSCRIÇÃO',
        minWidth: '130px',
        align: 'center',
        sortable: true,
      },
    ];

    const listInscription = listToShow as InscriptionData[];

    tableDataInscriptions = listInscription.map((item) => ({
      dt_prove: {
        valueToSort: `${
          item.dtm_data_prova ? convertToBrazilDate(item.dtm_data_prova) : ''
        }`,
        render: () => (
          <StyledTextTable>
            {item.dtm_data_prova ? convertToBrazilDate(item.dtm_data_prova) : ''}
          </StyledTextTable>
        ),
      },
      event: {
        valueToSort: `${item.cds_evento ?? ''}`,
        render: () => (
          <StyledTextTable $canBreak>{item.cds_evento ?? ''}</StyledTextTable>
        ),
      },
      modality: {
        valueToSort: `${item.cds_modalidade ?? ''}`,
        render: () => (
          <StyledTextTable $canBreak>{item.cds_modalidade ?? ''}</StyledTextTable>
        ),
      },
      animal: {
        value: item.cds_nome_animal || '', // to sort
        render: () => {
          return (
            <AnimalTableDataWithoutTooltip
              key={new Date().getTime()}
              value={item.cds_nome_animal.replace('<br/>', '')}
            />
          );
        },
      },
      competitor: {
        value: item.cds_nome_competidor || '', // to sort
        render: () => {
          return (
            <DivCompetitor>
              <CompetitorTableData
                key={new Date().getTime()}
                value={item.cds_nome_competidor.replace('<br/>', '')}
              />
            </DivCompetitor>
          );
        },
      },
      status: {
        valueToSort: `${item.situacao_inscricao ?? ''}`,
        render: () => <StyledTextTable>{item.situacao_inscricao ?? ''}</StyledTextTable>,
      },
      aqha: {
        valueToSort: `${item.cds_aqha ?? ''}`,
        render: () => <StyledTextTable>{item.cds_aqha ?? ''}</StyledTextTable>,
      },
      vlr_inscription: {
        valueToSort: `${item.nrv_total_inscricao ?? ''}`,
        render: () => (
          <StyledTextTable>
            {item.nrv_total_inscricao
              ? formatToBRL({ value: item.nrv_total_inscricao })
              : ''}
          </StyledTextTable>
        ),
      },
    }));
  } else {
    tableColumnsStalls = [
      {
        key: 'animal',
        label: 'ANIMAL',
        align: 'left',
        sortable: true,
      },
      {
        key: 'type_stall',
        label: 'TIPO DE BAIA',
        align: 'left',
        sortable: true,
      },
      {
        key: 'situation_stall',
        label: 'SITUAÇÃO BAIAS',
        align: 'center',
        sortable: true,
        minWidth: '200px',
      },
      {
        key: 'empty',
        label: '',
        width: '100%',
        align: 'center',
      },
      {
        key: 'value_stall',
        label: 'VALOR BAIAS',
        align: 'center',
        sortable: true,
        minWidth: '120px',
      },
    ];

    const listStalls = listToShow as StallsData[];

    tableDataStalls = listStalls.map((item) => ({
      animal: {
        value: item.cds_nome_animal || '', // to sort
        render: () => {
          return (
            <AnimalTableDataWithoutTooltip
              key={new Date().getTime()}
              value={item.cds_nome_animal}
            />
          );
        },
      },
      type_stall: {
        valueToSort: `${item.cds_tipo_baia ?? ''}`,
        render: () => <StyledTextTable>{item.cds_tipo_baia ?? ''}</StyledTextTable>,
      },
      situation_stall: {
        valueToSort: `${item.cds_situacao_baia ?? ''}`,
        render: () => <StyledTextTable>{item.cds_situacao_baia ?? ''}</StyledTextTable>,
      },
      empty: {
        value: '',
      },
      value_stall: {
        valueToSort: `${item.nnr_valor_baia ?? ''}`,
        render: () => (
          <StyledTextTable>
            {formatToBRL({ value: item.nnr_valor_baia, fallback: '-' })}
          </StyledTextTable>
        ),
      },
    }));
  }

  const printCards = [
    {
      title: 'DATA DO EVENTO',
      value: '0',
    },
    {
      title: 'INSCRIÇÕES',
      value: '0',
    },
  ];

  const printInfo: PrintHeaderProps = {
    eventName: '',
    responsibleName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    modalityName: '',
  };

  const buttonsHeader = [
    {
      icon: isPrinting ? (
        <SpinnerRingResizeIcon
          fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75}
        />
      ) : (
        <PrinterIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75} />
      ),
      label: 'imprimir',
      onClick: onTriggerPrintPDF,
    },
    {
      icon: (
        <CurrencyDollarIcon
          fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75}
        />
      ),
      label: 'efetuar pagamento',
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
      <MobileInscriptionAndStalls
        activeTab={activeTab}
        handleOnGoBack={handleOnGoBack}
        setSearchValue={setSearchValue}
        tabsToShow={tabsToShow}
        setActiveTab={setActiveTab}
        tableData={tableDataInscriptions || tableDataStalls}
        tableColumns={tableColumnsIncriptions || tableColumnsStalls}
        isLoading={isLoading}
        isTabletOrMobile={isTabletOrMobile}
        showShareOptions={showShareOptions}
        shareUrl={shareUrl}
      />
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={pageTitle} subTitle={''} buttons={buttonsHeader} />}
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        footerType="medium"
        count={tableDataInscriptions.length || tableDataStalls.length}
      >
        <HeaderNavigatorDesktop
          title={pageName}
          subtitle={'ABQM'}
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
            setIsLoading(true);
            setActiveTab(tab as Tab['type']);

            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }}
          tabs={
            tabsToShow.length === 0
              ? []
              : tabsToShow.map((tab) => ({
                  label: tab.type,
                  value: tab.type,
                }))
          }
          // hideAutoWidthElement
        >
          <ContentTabs>
            <InfoCardsGroup
              sum_inscriptions={sumTotalInscriptions}
              sum_stalls={sumTotalStalls}
              sum_all={sumTotalInscriptions + sumTotalStalls}
              qtd_inscriptions={
                tabsToShow.filter((tab) => tab.type === 'inscrições')[0]?.list.length || 0
              }
              qtd_stalls={
                tabsToShow.filter((tab) => tab.type === 'baias')[0]?.list.length || 0
              }
            />
          </ContentTabs>
        </TabsCardsBar>

        {activeTab === 'inscrições' ? (
          <TableWithLoader
            data={tableDataInscriptions}
            columns={tableColumnsIncriptions}
            isLoading={isLoading}
            minWidthTable="100%"
          />
        ) : (
          <TableWithLoader
            data={tableDataStalls}
            columns={tableColumnsStalls}
            isLoading={isLoading}
            minWidthTable="100%"
          />
        )}
      </ContentDektop>

      {activeTab === 'inscrições' ? (
        <>
          {tableDataInscriptions?.length > 0 && (
            <PrintArea
              ref={printAreaRef}
              title={'INSCRIÇÕES'}
              columns={tableColumnsIncriptions}
              data={tableDataInscriptions}
              cards={printCards}
              info={printInfo}
              totalForPage={17}
            />
          )}
        </>
      ) : (
        <>
          {tableDataStalls?.length > 0 && (
            <PrintArea
              ref={printAreaRef}
              title={'RESERVAS DE BAIAS'}
              columns={tableColumnsStalls}
              data={tableDataStalls}
              cards={printCards}
              info={printInfo}
              totalForPage={17}
            />
          )}
        </>
      )}

      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
};

export default InscriptionAndStalls;
