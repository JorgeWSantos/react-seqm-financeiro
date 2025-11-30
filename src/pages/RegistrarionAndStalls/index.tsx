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
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain, DivCompetitor, ContentTabs, StyledTextTable } from './styles';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  PrinterIcon,
  SearchIcon,
  ShareIcon,
  SpinnerRingResizeIcon,
} from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';

import { useParams } from 'react-router';

import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import PrintArea from '@src/components/PrintArea';
import type { Tab } from './types';
import { useInscriptionAndStalls } from '@src/services/RegistrarionAndStalls/useRegistrarionAndStalls';
import type { InscriptionData } from '@src/services/RegistrarionAndStalls/types.inscription.api';
import { InfoCardsGroup } from './InfoCards';
import { MobileInscriptionAndStalls } from './Mobile';
import type { StallsData } from '@src/services/RegistrarionAndStalls/types.stalls.api';

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

    const data = await getInscriptions({
      nid_group_event,
      year,
    });

    const data2 = await getStalls({
      nid_group_event,
      year,
    });

    setPageName(data[0]?.cds_evento || '');

    if (data.length > 0) {
      const _tabs: Tab[] = [];

      _tabs.push({
        list: data || [],
        type: 'inscrições',
      });

      _tabs.push({
        list: data2 || [],
        type: 'baias',
      });

      setActiveTab('inscrições');
      setTabsToShow(_tabs);
    }

    setListToShow(data);

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
      if ('nnr_classificacao_abqm' in item) {
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

  let tableColumns: Array<TableColumnSEQM> = [];
  let tableData: Array<TableRowSEQM> = [];

  if (activeTab === 'inscrições' && 'cds_nome_competidor' in listToShow[0]) {
    tableColumns = [
      {
        key: 'abqm',
        label: 'ABQM',
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
        key: 'animal',
        label: 'ANIMAL',
        align: 'left',
        sortable: true,
      },
      {
        key: 'empty',
        label: '',
        width: '100%',
        align: 'center',
      },
    ];

    const listInscription = listToShow as InscriptionData[];

    tableData = listInscription.map((item) => ({
      abqm: {
        valueToSort: `${item.cds_modalidade + (item.cds_modalidade ? '°' : '')}`,
        render: () => (
          <StyledTextTable>
            {item.cds_modalidade + (item.cds_modalidade ? '°' : '')}
          </StyledTextTable>
        ),
      },
      competitor: {
        value: item.cds_nome_competidor || '', // to sort
        render: () => {
          return (
            <DivCompetitor>
              <CompetitorTableData
                key={new Date().getTime()}
                value={item.cds_nome_competidor}
              />
            </DivCompetitor>
          );
        },
      },
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
      empty: {
        value: '',
      },
    }));
  } else {
    tableColumns = [
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

    tableData = listStalls.map((item) => ({
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
        <ShareIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75} />
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
        tableData={tableData}
        tableColumns={tableColumns}
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
        count={tableData.length}
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
            setActiveTab(tab as Tab['type']);
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
              qtde_inscriptions="0"
              qtde_competitors="0"
              qtde_animals="0"
              premiation_value={null}
              dt_prove={null}
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
          totalForPage={17}
        />
      )}
      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
};

export default InscriptionAndStalls;
