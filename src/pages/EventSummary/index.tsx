import {
  ContentDektop,
  ContentMobile,
  Dropdown,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  ShareOptions,
  StyledTableSEQMTextTd,
  Text,
  type DataDropdown,
  type FooterWithButtonsPropsType,
  // type FooterWithButtonsPropsType,
  type TableColumnSEQM,
  type TableRowSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ButtonTop10,
  ContainerMain,
  DivDropDownSearch,
  DivLeft,
  DivRight,
  DivTopRight,
  Scrollable,
  StyledHeadingMobile,
} from './styles';
import TableWithLoader from '@src/components/EventSummary/TableWithLoader';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import {
  CheckIcon,
  DashIcon,
  PrinterIcon,
  ShareIcon,
  StarIcon,
  TrophyIcon,
} from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { Link, useParams } from 'react-router';
import InfoEventDetails from '@components/EventSummary/InfoEventDetails';
import EventSummaryDetails from '@components/EventSummary/EventSummaryDetails';
import GraphSummaryDetails from '@components/EventSummary/GraphSummaryDetails';
import { useEventSummary } from '@src/services/EventSummary/useEventSummary';
import type {
  EventSummaryResponseData,
  ProvesEventSummary,
  ResultModalityByProve,
} from '@services/EventSummary/types.api';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import PrintArea from '@src/components/PrintArea';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import ModalityDropdown from '@components/EventSummary/ModalityDropdown';
import { useInfoEvent } from '@src/services/General/useInfoEvent';
import type { InfoEventData } from '@src/services/General/types.info-event.api';
import { FooterWithButtons } from './FooterWithButtons';

function EventSummary() {
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

  // Ref para acessar o método print do PrintArea
  const printAreaRef = useRef<{ print: () => void }>(null);

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
  const [provesDropdown, setProvesDropdown] = useState<DataDropdown[]>([]);
  const [proveSelected, setProveSelected] = useState<DataDropdown | null>(null);
  const [switchResumeChecked, setSwitchResumeChecked] = useState(false);

  const handleGetSummary = useCallback(
    async ({ prove_id_selected }: { prove_id_selected: string }) => {
      if (!prove_id_selected || !event_id) {
        setIsLoading(false);
        return;
      }

      const data = await getEventSummary({
        prove_id: prove_id_selected === 'nao-pontuados' ? 0 : Number(prove_id_selected),
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

      setProvesDropdown(provesFormatted);
      setProveSelected(
        provesFormatted.filter((item) => item.id === prove_id_selected)[0]
      );
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

    const resumeData = {
      inscricoes: resumes?.[0].inscricoes ?? '0',
      competidores: resumes?.[0].competidores ?? '0',
      animais: resumes?.[0].animais ?? '0',
      premiacao: resumes?.[0].premiacao ?? 'sem premiação',
    };

    const generalResume = {
      inscricoes: resumes?.[1].inscricoes ?? '0',
      competidores: resumes?.[1].competidores ?? '0',
      animais: resumes?.[1].animais ?? '0',
      premiacao: resumes?.[1].premiacao ?? 'sem premiação',
    };

    if (switchResumeChecked) {
      setEventSummaryNumbers(resumeData);
    } else {
      setEventSummaryNumbers(generalResume);
    }
  }, [eventSummaryData, switchResumeChecked]);

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
        <Link
          style={{
            height: '100%',
            width: '100%',
          }}
          to={`/modalidade/${prove_id}/evento/${event_id}/prova-evento/${prove_event_id}/classificatoria/${classificatory_id}`}
        >
          {children}
        </Link>
      );
    },
    []
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

  const printCards = [
    {
      title: 'INSCRIÇÕES',
      value: eventSummaryNumbers.inscricoes,
    },
    {
      title: 'COMPETIDORES',
      value: eventSummaryNumbers.competidores,
    },
    {
      title: 'ANIMAIS',
      value: eventSummaryNumbers.animais,
    },
    {
      title: eventSummaryNumbers.premiacao === 'sem premiação' ? '' : 'PREMIAÇÃO',
      value: eventSummaryNumbers.premiacao,
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
            eventInfoData?.nid_agrupa_evento
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

  return (
    // <Layout
    //   {...(isTabletOrMobile && {
    //     footerButtonsMobile: buttonsMobileFooter,
    //   })}
    // >
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={
            <Header
              text={pageTitle}
              subTitle={getNameProveById(Number(prove_id))}
              buttons={buttonsHeader}
            />
          }
          headerNavigator={
            <HeaderNavigatorDesktop
              title={eventInfoData?.cds_evento || ''}
              hasBackButton
              onGoBack={() => navigate('/modalidade/' + prove_id)}
            />
          }
          contentBoxStyles={{
            padding: '1.5rem',
            gap: '0.25rem',
          }}
        >
          <Scrollable>
            <DivLeft>
              <InfoEventDetails data={eventInfoData} />

              <EventSummaryDetails
                data={eventSummaryNumbers}
                switchChecked={switchResumeChecked}
                setSwitchChecked={setSwitchResumeChecked}
              />

              <GraphSummaryDetails
                data={eventSummaryData.tipo_estatistica_prova}
                isTabletOrMobile={isTabletOrMobile}
              />
            </DivLeft>

            <DivRight>
              <DivTopRight>
                <DivDropDownSearch>
                  <ModalityDropdown
                    prove_id={prove_id}
                    provesDropdown={provesDropdown}
                    proveSelected={proveSelected}
                    setProveSelected={setProveSelected}
                    handleGetSummary={handleGetSummary}
                  />
                </DivDropDownSearch>

                <Link
                  to={`/modalidade/${listToShow[0]?.nid_prova}/evento/${listToShow[0]?.nid_evento}/prova-evento/${listToShow[0]?.nid_prova_evento}/top10`}
                >
                  <ButtonTop10>
                    <TrophyIcon fill={colors.white75} />
                    <Text
                      fontSize="ssm"
                      fontWeight="semiBold"
                      lineHeight="tight"
                      color={colors.white75}
                      style={{ marginTop: '2px' }}
                    >
                      TOP 10
                    </Text>
                  </ButtonTop10>
                </Link>
              </DivTopRight>

              <TableWithLoader
                data={tableData}
                columns={tableColumns}
                isLoading={isLoading}
              />
            </DivRight>
          </Scrollable>
        </ContentDektop>
      ) : (
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
                data={provesDropdown}
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

            <EventSummaryDetails
              data={eventSummaryNumbers}
              switchChecked={switchResumeChecked}
              setSwitchChecked={setSwitchResumeChecked}
            />

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
      )}

      {tableData?.length > 0 && (
        <PrintArea
          ref={printAreaRef}
          title={switchResumeChecked ? 'RESUMO GERAL' : 'RESUMO DA MODALIDADE'}
          columns={tableColumns}
          data={tableData}
          cards={printCards}
          info={printInfo}
          totalForPage={7}
        />
      )}

      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}

      <FooterWithButtons footerButtonsMobile={buttonsMobileFooter} />
    </ContainerMain>
  );
}

export default EventSummary;
