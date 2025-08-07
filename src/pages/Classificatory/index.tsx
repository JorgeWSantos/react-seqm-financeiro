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

import { ContainerMain, Scrollable, ItemCardGroup, TabAndCards } from './styles';
import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { PrinterIcon, SearchIcon, ShareIcon, StarIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useClassificatory } from '@src/services/useClassificatory';
import type { ClassificatoryData } from './types.classificatory.api';
import { useParams } from 'react-router';
import type {
  ClassificatoryEventData,
  ClassificatoryInscriptionsResumeData,
} from './types.event-details.api';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import PrintArea from '@src/components/PrintArea';
import { handlePrintPDF } from '@src/components/PrintArea/utils';
import TableWithLoader from '@src/components/EventSummary/TableWithLoader';
import { convertToBrazilDate } from '@src/utils/formatDate';
import TabOption from '@src/components/Top10/TabOption';
import ItemCard from '@src/components/Top10/InfoCard';

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
    useState<ClassificatoryInscriptionsResumeData | null>(
      {} as ClassificatoryInscriptionsResumeData
    );

  // const [judmentCard, setJudgmentCard] = useState<string>('');

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  const handleGetResultsClassificatory = useCallback(async () => {
    if (!prove_event_id) {
      return;
    }

    const data = await getClassificatory({
      prove_event_id: Number(prove_event_id),
    });

    setAllList(data[0]?.lista_classificacao || []);
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
      setEventInfoData(detalhe_evento);
    }

    if (resumo_inscricoes) {
      setResumeInscriptionsData(resumo_inscricoes);
    }

    // if (cartao_julgamento) {
    //   setJudgmentCard(cartao_julgamento);
    // }
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
  }, [searchValue, allList]);

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
            width: '4%',
            minWidth: '3rem',
            align: 'center' as const,
          },
        ]
      : []),
    {
      key: 'abqm',
      label: 'ABQM',
      width: '5%',
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
      width: '8%',
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
      value: convertToBrazilDate(eventInfoData?.dtm_data_prova || '') || '0',
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
    );
  }

  return (
    <ContainerMain>
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
              debounceDelay={1000}
            />
          </HeaderNavigatorDesktop>
        }
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
        }}
        count={tableData.length}
      >
        <TabAndCards>
          <div className="empty">
            <TabOption title="Classificatória" active={true} />
            <TabOption title="Final" active={false} />
          </div>

          <ItemCardGroup>
            <ItemCard
              title="inscrições"
              info={resumeInscriptionsData?.nnr_qtde_inscricoes?.toString() || '-'}
            />

            <ItemCard
              title="competidores"
              info={resumeInscriptionsData?.nnr_qtde_competidores?.toString() || '-'}
            />

            <ItemCard
              title="animais"
              info={resumeInscriptionsData?.nnr_qtde_animais?.toString() || '-'}
            />

            <ItemCard
              title="premiação"
              info={resumeInscriptionsData?.nvl_premiacao?.toString() || '-'}
              reverse
            />

            <ItemCard
              title="data da prova"
              info={convertToBrazilDate(eventInfoData?.dtm_data_prova || '') || '-'}
              reverse
            />
          </ItemCardGroup>
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
          title={'RESULTADOS DO EVENTO'}
          columns={tableColumns}
          data={tableData}
          cards={printCards}
          info={printInfo}
        />
      )}
      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
}

export default Classificatory;
