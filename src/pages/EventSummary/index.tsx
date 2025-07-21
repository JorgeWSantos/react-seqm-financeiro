import {
  ContentDektop,
  ContentMobile,
  Dropdown,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  Text,
  Toast,
  type DataDropdown,
  type FooterWithButtonsPropsType,
  type TableColumnSEQM,
} from '@abqm-ds/react';

// import ShareOptions from '../../components/ShareOptions';

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
import EventTable from './EventTable';
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
import type { TableEventSummaryData } from './types';
import { useParams } from 'react-router';
import InfoEventDetails from '../../components/EventSummary/InfoEventDetails';
import EventSummaryDetails from '../../components/EventSummary/EventSummaryDetails';
import GraphSummaryDetails from '../../components/EventSummary/GraphSummaryDetails';
import { useEventSummary } from '@src/services/useEventSummary';
import type {
  EventSummaryResponseData,
  InfoEventSummaryData,
  ProvesEventSummary,
  ResultModalityByProve,
} from './types.api';
import { useCallback, useEffect, useState } from 'react';
import { handlePrintPDF } from '@src/components/PrintArea/utils';
import PrintArea from '@src/components/PrintArea';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import ModalityDropdown from './ModalityDropdown';
import Layout from '@src/Layout';

function EventSummary() {
  const pageTitle = 'Resultados »';

  // const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const prove_id = params.prove_id;
  const event_id = params.event_id;

  const { setPage } = usePage();
  const { isTabletOrMobile, isMobile } = useDeviceType();
  const { getEventSummary, getInfoEvent } = useEventSummary();

  const [isLoading, setIsLoading] = useState(true);
  const [eventSummaryData, setEventSummaryData] = useState<EventSummaryResponseData>(
    {} as EventSummaryResponseData
  );
  const [eventInfoData, setEventInfoData] = useState<InfoEventSummaryData | null>(
    {} as InfoEventSummaryData
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

  const columns: Array<TableColumnSEQM<TableEventSummaryData>> = [
    {
      key: 'category',
      label: 'CATEGORIA',
      width: '60%',
    },
    {
      key: 'organizator',
      label: 'ORGANIZADOR',
      width: '7%',
      align: 'center',
      render: (item) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {item.organizator === 'Sim' ? <CheckIcon /> : <DashIcon />}
        </div>
      ),
    },
    {
      key: 'judge',
      label: 'JUÍZ',
      width: '7%',
      align: 'center',
      render: (item) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {item.judge === 'Sim' ? <CheckIcon /> : <DashIcon />}
        </div>
      ),
    },
    {
      key: 'ABQM',
      label: 'ABQM',
      align: 'center',
      width: '7%',
      render: (item) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {item.ABQM === 'Sim' ? <CheckIcon /> : <DashIcon />}
        </div>
      ),
    },
    {
      key: 'inscriptions',
      label: 'INSCRIÇÕES',
      width: '7%',
      align: 'center',
    },
  ];

  const data: Array<TableEventSummaryData> = listToShow?.map((item) => ({
    category: item.cds_evento.toUpperCase(),
    organizator: item.cds_status_organizador ? 'Sim' : 'Não',
    judge: item.cds_status_juiz ? 'Sim' : 'Não',
    ABQM: item.cds_status_abqm ? 'Sim' : 'Não',
    inscriptions: item.participantes.toString(),
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
      onClick: handlePrintPDF,
    },
    {
      icon: (
        <ShareIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
      ),
      label: 'compartilhar',
      onClick: () => {
        Toast.show({
          message: 'Link copiado para sua área de transferência!',
        });

        navigator.clipboard.writeText(shareUrl);
      },
      // isActive: showShareOptions,
    },
  ];

  const buttonsMobileFooter: FooterWithButtonsPropsType = buttonsHeader.map((btn) => ({
    ...btn,
    variant: 'outline-white-25',
  }));

  return (
    <Layout
      {...(isTabletOrMobile && {
        footerButtonsMobile: buttonsMobileFooter,
      })}
    >
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
                </DivTopRight>

                <EventTable data={data} columns={columns} isLoading={isLoading} />
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
            <Scrollable>
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
                <EventTable data={data} columns={columns} isLoading={isLoading} />
              </DivRight>
            </Scrollable>
          </ContentMobile>
        )}

        {/* {showShareOptions && <ShareOptions url={shareUrl} />} */}

        {data?.length > 0 && (
          <PrintArea
            title={switchResumeChecked ? 'RESUMO GERAL' : 'RESUMO DA MODALIDADE'}
            columns={columns}
            data={data}
            cards={printCards}
            info={printInfo}
          />
        )}
      </ContainerMain>
    </Layout>
  );
}

export default EventSummary;
