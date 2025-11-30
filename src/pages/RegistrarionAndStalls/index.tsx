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
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerMain, DivCompetitor, ContentTabs, StyledTextTable } from './styles';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
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
import { useRegistrationAndStalls } from '@src/services/RegistrarionAndStalls/useRegistrarionAndStalls';
import type { RegistrationAndStallsData } from '@src/services/RegistrarionAndStalls/types.registrationandstalls.api';
import { InfoCardsGroup } from './InfoCards';
import { MobileRegistrationAndStalls } from './Mobile';

const RegistrationAndStalls = () => {
  const params = useParams();
  const { year, nid_group_event } = params;

  const pageTitle = 'Resultados';
  const subTitle = '';

  const navigate = useNavigate();
  const { isTabletOrMobile } = useDeviceType();
  const { getInscriptions, getStalls } = useRegistrationAndStalls();

  const [isLoading, setIsLoading] = useState(true);
  const [listToShow, setListToShow] = useState<RegistrationAndStallsData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tabsToShow, setTabsToShow] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab['type']>('inscriptions');

  // Ref para acessar o método print do PrintArea
  const printAreaRef = useRef<{ print: () => void }>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  //functions
  const handleGetResultsRegistrationAndStalls = useCallback(async () => {
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

    if (data.length > 0) {
      const _tabs: Tab[] = [];

      _tabs.push({
        list: data || [],
        type: 'inscriptions',
      });

      _tabs.push({
        list: data2 || [],
        type: 'stalls',
      });

      setActiveTab('inscriptions');
      setTabsToShow(_tabs);
    }

    setListToShow(data);

    setIsLoading(false);
  }, [getInscriptions, getStalls, nid_group_event, year]);

  const handleOnGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onTriggerPrintPDF = useCallback(async () => {
    setIsPrinting(true);
    setTimeout(() => {
      printAreaRef.current?.print();
      setIsPrinting(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let allList: RegistrationAndStallsData[] = [];

    if (tabsToShow.length > 0) {
      allList = tabsToShow.filter((item) => item.type === activeTab)[0].list || [];
    }

    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const search = searchValue.toLowerCase();

    const filteredList = allList.filter((item) => {
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
      // Filtro por nome do proprietario dentro de equipe

      return matchClassificacao || matchAnimal || matchCompetitor || matchTN;
    });

    console.log('filteredList', filteredList);

    setListToShow(filteredList);
  }, [activeTab, searchValue, tabsToShow]);

  useEffect(() => {
    handleGetResultsRegistrationAndStalls();
  }, [handleGetResultsRegistrationAndStalls]);

  const tableColumns: Array<TableColumnSEQM> = [
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

  const tableData: Array<TableRowSEQM> = listToShow.map((item) => ({
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
      <MobileRegistrationAndStalls
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
        header={<Header text={pageTitle} subTitle={subTitle} buttons={buttonsHeader} />}
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        footerType="medium"
        count={tableData.length}
      >
        <HeaderNavigatorDesktop
          title={'title'}
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

export default RegistrationAndStalls;
