import {
  ContentDektop,
  ContentMobile,
  Dropdown,
  FooterWithButtons,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  ShareOptions,
  StyledTableSEQMTextTd,
  TableWithLoader,
  Text,
  type DataDropdown,
  type FooterWithButtonsPropsType,
  type TableColumnSEQM,
  type TableRowSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ContainerDetails,
  ContainerMain,
  ContainerMainMobile,
  DivLeft,
  DivRight,
  DivTopRight,
  LinkToRedirect,
  Scrollable,
  StyledHeadingMobile,
} from './styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { CheckIcon, DashIcon, ShareIcon, StarIcon, TrophyIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useParams } from 'react-router';
import InfoEventDetails from '@components/EventResume/InfoEventDetails';
import GraphSummaryDetails from '@components/EventResume/GraphSummaryDetails';
import { useEventSummary } from '@src/services/EventSummary/useEventSummary';
import type {
  EventSummaryResponseData,
  ProvesEventSummary,
  ResultModalityByProve,
} from '@services/EventSummary/types.api';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useInfoEvent } from '@src/services/General/useInfoEvent';
import type { InfoEventData } from '@src/services/General/types.info-event.api';
import EventResumeDetails from '@src/components/EventResume/EventResumeDetails';
import ProvesDetails from '@src/components/EventResume/ProvesDetails';

function EventResume() {
  const pageTitle = 'Resultados »';

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // TODO: preparar tela para os eventos não pontuados
  // modalidade/nao-pontuados/evento/38648
  const prove_id = params.prove_id;
  const event_id = params.event_id;

  const { setPage } = usePage();
  const { isTabletOrMobile, isMobile } = useDeviceType();
  const { getEventSummary } = useEventSummary();
  const { getInfoEvent } = useInfoEvent();

  const [isLoading, setIsLoading] = useState(true);

  const [eventSummaryData, setEventSummaryData] = useState<EventSummaryResponseData>(
    {} as EventSummaryResponseData
  );

  const [eventInfoData, setEventInfoData] = useState<InfoEventData | null>(
    {} as InfoEventData
  );

  const [eventSummaryNumbers, setEventSummaryNumbers] = useState<{
    inscricoes: string;
    competidores: string;
    animais: string;
    premiacao: string;
  }>({
    inscricoes: '0',
    competidores: '0',
    animais: '0',
    premiacao: 'sem premiação',
  });

  const [listToShow, setListToShow] = useState<ResultModalityByProve[]>([]);
  const [allProves, setAllProves] = useState<DataDropdown[]>([]);
  const [proveSelected, setProveSelected] = useState<DataDropdown | null>(null);

  const handleGetSummary = useCallback(
    async ({ prove_id_selected }: { prove_id_selected: string }) => {
      if (!prove_id_selected || !event_id) {
        setIsLoading(false);
        return;
      }

      const data = await getEventSummary({
        event_id: Number(event_id),
      });

      setEventSummaryData(data);
      setListToShow(data.resultado_modalidade_prova);

      const formatToDropdown = (items: ProvesEventSummary[]) =>
        items.map((item) => ({
          id: item.nid_prova.toString(),
          label: item.cds_tipo_prova,
          value: item.cds_tipo_prova,
        }));

      const provesFormatted = formatToDropdown(data.provas);

      setAllProves(provesFormatted);

      const proveToBeFirst =
        prove_id_selected !== 'nao-pontuados'
          ? prove_id_selected
          : provesFormatted[0]?.id;

      setProveSelected(provesFormatted.filter((item) => item.id === proveToBeFirst)[0]);
    },
    [getEventSummary, event_id]
  );

  const handleGetEventInfo = useCallback(async () => {
    if (!event_id) {
      return;
    }

    const data = await getInfoEvent({
      event_id: Number(event_id),
    });

    setEventInfoData(data);
  }, [getInfoEvent, event_id]);

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      await handleGetSummary({ prove_id_selected: prove_id || '' });
      await handleGetEventInfo();

      setIsLoading(false);
    };

    loadData();
  }, [prove_id, handleGetSummary, handleGetEventInfo]);

  useEffect(() => {
    if (!eventSummaryData || !eventSummaryData.numeros_evento) {
      return;
    }
    const resumes = eventSummaryData.numeros_evento || [];

    // console.log('resumes', resumes);

    // const resumeData = {
    //   inscricoes: resumes?.[1]?.inscricoes ?? '0',
    //   competidores: resumes?.[1]?.competidores ?? '0',
    //   animais: resumes?.[1]?.animais ?? '0',
    //   premiacao: resumes?.[1]?.premiacao ?? 'sem premiação',
    // };

    const generalResumeData = {
      inscricoes: resumes?.[0]?.inscricoes ?? '0',
      competidores: resumes?.[0]?.competidores ?? '0',
      animais: resumes?.[0]?.animais ?? '0',
      premiacao: resumes?.[0]?.premiacao ?? 'sem premiação',
    };

    setEventSummaryNumbers(generalResumeData);
  }, [eventSummaryData]);

  const redirectToClassificatory = useCallback(
    ({
      children,
      prove_id,
      event_id,
      prove_event_id,
      classificatory_id,
    }: {
      children: ReactNode;
      prove_id: string | number;
      event_id: number;
      prove_event_id: number;
      classificatory_id: number;
    }) => {
      return (
        <LinkToRedirect
          onClick={() =>
            navigate(
              `/modalidade/${prove_id}/evento/${event_id}/prova-evento/${prove_event_id}/classificatoria/${classificatory_id}`
            )
          }
        >
          {children}
        </LinkToRedirect>
      );
    },
    [navigate]
  );

  const tableColumns: Array<TableColumnSEQM> = [
    {
      key: 'modality',
      label: 'CATEGORIA',
      width: '58%',
      minWidth: '150px',
    },
    {
      key: 'organizator',
      label: 'ORGANIZADOR',
      width: '15%',
      minWidth: '90px',
      align: 'center',
    },
    {
      key: 'judge',
      label: 'JUÍZ',
      width: '7%',
      minWidth: '50px',
      align: 'center',
    },
    {
      key: 'ABQM',
      label: 'ABQM',
      minWidth: '50px',
      align: 'center',
      width: '7%',
    },
    {
      key: 'inscriptions',
      label: 'INSCRIÇÕES',
      width: '16%',
      minWidth: '90px',
      align: 'center',
    },
  ];

  const tableData: Array<TableRowSEQM> = listToShow?.map((item) => ({
    modality: {
      render: () =>
        redirectToClassificatory({
          children: <StyledTableSEQMTextTd>{item.cds_modalidade}</StyledTableSEQMTextTd>,
          prove_id: item.nid_prova === 0 ? 'nao-pontuados' : item.nid_prova ?? 0,
          event_id: item.nid_evento ?? 0,
          classificatory_id: item.nid_prova_evento_classificatoria ?? 0,
          prove_event_id: item.nid_prova_evento ?? 0,
        }),
    },
    organizator: {
      render: () => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {item.cds_status_organizador ? <CheckIcon /> : <DashIcon />}
        </div>
      ),
    },
    judge: {
      render: () => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {item.cds_status_juiz ? <CheckIcon /> : <DashIcon />}
        </div>
      ),
    },
    ABQM: {
      render: () => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {item.cds_status_abqm ? <CheckIcon /> : <DashIcon />}
        </div>
      ),
    },
    inscriptions: { value: item.participantes.toString() },
  }));

  const buttonsHeader = [
    {
      icon: <StarIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen75} />,
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

  const buttonsMobileFooter: FooterWithButtonsPropsType = [
    {
      icon: (
        <TrophyIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
      ),
      label: 'top 10',
      onClick: () => {
        navigate(
          `/modalidade/${listToShow[0]?.nid_prova}/evento/${listToShow[0]?.nid_evento}/prova-evento/${listToShow[0]?.nid_prova_evento}/top10`
        );
      },
      variant: 'outline-white-25',
    },
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
      variant: 'outline-white-25',
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
        children: <ShareOptions url={shareUrl} variantArrow="bottom" />,
      },
      variant: 'outline-white-25',
    },
  ];

  if (isTabletOrMobile) {
    return (
      <ContainerMainMobile>
        <ContentMobile
          style={{
            maxWidth: '100dvw',
          }}
          headerMobileNavigator={
            <HeaderMobileNavigator
              title={eventInfoData?.cds_evento || ''}
              hasBackButton
              onGoBack={() => navigate('/modalidade/' + prove_id)}
            >
              <Dropdown
                variant="secondary"
                data={allProves}
                setValue={(value) => {
                  setProveSelected(value);
                  handleGetSummary({ prove_id_selected: value.id });
                }}
                value={proveSelected}
                maxHeight="26rem"
                maxWidth={isMobile ? '100%' : '20rem'}
              />
            </HeaderMobileNavigator>
          }
          hasFooterButtons
        >
          <StyledHeadingMobile>{eventInfoData?.cds_evento}</StyledHeadingMobile>

          <DivLeft>
            <InfoEventDetails data={eventInfoData} />

            <EventResumeDetails data={eventSummaryNumbers} />

            <GraphSummaryDetails
              data={eventSummaryData.tipo_estatistica_prova}
              isTabletOrMobile={isTabletOrMobile}
            />
          </DivLeft>

          <DivRight>
            <TableWithLoader
              data={tableData}
              columns={tableColumns}
              isLoading={isLoading}
            />
          </DivRight>
        </ContentMobile>

        {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}

        <FooterWithButtons footerButtonsMobile={buttonsMobileFooter} />
      </ContainerMainMobile>
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={
          <Header
            text={pageTitle}
            subTitle={getNameProveById(Number(prove_id))}
            buttons={buttonsHeader}
          />
        }
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          position: 'relative',
        }}
      >
        <HeaderNavigatorDesktop
          title={'RESUMO GERAL DO EVENTO'}
          subtitle={eventInfoData?.cds_evento || ''}
          hasBackButton
          onGoBack={() => navigate('/modalidade/' + prove_id)}
        />
        <Scrollable>
          <DivLeft>
            <InfoEventDetails data={eventInfoData} />

            <EventResumeDetails data={eventSummaryNumbers} />

            {/* <GraphSummaryDetails
              data={eventSummaryData.tipo_estatistica_prova}
              isTabletOrMobile={isTabletOrMobile}
            /> */}
          </DivLeft>

          <DivRight>
            <DivTopRight>
              <Text color={colors.white} fontSize="ssm">
                modalidades
              </Text>
            </DivTopRight>

            <ContainerDetails>
              <ProvesDetails data={{ ...eventSummaryNumbers, name_prove: 'Apartação' }} />
              <ProvesDetails
                data={{ ...eventSummaryNumbers, name_prove: 'Três Tambores' }}
              />
            </ContainerDetails>
          </DivRight>
        </Scrollable>
      </ContentDektop>

      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
}

export default EventResume;
