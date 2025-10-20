import {
  ContentDektop,
  ContentMobile,
  FooterWithButtons,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  ShareOptions,
  Text,
  InfoEventDetails,
  type FooterWithButtonsPropsType,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ContainerDetails,
  ContainerMain,
  ContainerMainMobile,
  DivLeft,
  DivRight,
  DivTopRight,
  Scrollable,
  StyledHeadingMobile,
} from './styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { ShareIcon, StarIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useParams } from 'react-router';
import { useEventResumeService } from '@src/services/EventResume/useEventResumeService';
import type { EventResumeResponseData } from '@services/EventResume/types.api';
import { useCallback, useEffect, useState } from 'react';
import { useInfoEvent } from '@src/services/General/useInfoEvent';
import type { InfoEventData } from '@src/services/General/types.info-event.api';
import EventResumeDetails from '@src/components/EventResume/EventResumeDetails';
import ProvesDetails from '@src/components/EventResume/ProvesDetails';
import GraphSummaryDetails from '@src/components/EventResume/GraphSummaryDetails';

function EventResume() {
  const pageTitle = 'Resultados »';

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const prove_id = params.prove_id;
  const event_id = params.event_id;

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getEventResume } = useEventResumeService();
  const { getInfoEvent } = useInfoEvent();

  const [eventResumeData, seteventResumeData] = useState<EventResumeResponseData>(
    {} as EventResumeResponseData
  );

  const [eventInfoData, setEventInfoData] = useState<InfoEventData | null>(
    {} as InfoEventData
  );

  const resumoGeral = Array.isArray(eventResumeData.numeros_evento)
    ? eventResumeData.numeros_evento.find((item) => item.prova === 'Todas')
    : undefined;

  // Valores padrão caso não exista
  const eventResumeNumbers = {
    inscricoes: resumoGeral?.inscricoes ?? '0',
    competidores: resumoGeral?.competidores ?? '0',
    animais: resumoGeral?.animais ?? '0',
    premiacao:
      resumoGeral?.premiacao !== undefined &&
      resumoGeral?.premiacao !== null &&
      resumoGeral?.premiacao !== 'null' &&
      resumoGeral?.premiacao !== ''
        ? `R$ ${resumoGeral.premiacao}`
        : 'sem premiação',
  };

  const numerosEventoMap = Array.isArray(eventResumeData.numeros_evento)
    ? Object.fromEntries(eventResumeData.numeros_evento.map((num) => [num.prova, num]))
    : {};

  // Debug: Verifique se os ids das provas batem com os ids dos resumos
  if (eventResumeData.provas && eventResumeData.numeros_evento) {
    // Mostra os ids das provas e dos resumos
    // Remova depois de depurar!
  }

  const handleGetSummary = useCallback(async () => {
    if (!event_id) {
      return;
    }

    const data = await getEventResume({
      event_id: Number(event_id),
    });

    seteventResumeData(data);
  }, [getEventResume, event_id]);

  const handleGetEventInfo = useCallback(async () => {
    if (!event_id) {
      return;
    }

    const data = await getInfoEvent({
      event_id: Number(event_id),
    });

    setEventInfoData(data);
  }, [getInfoEvent, event_id]);

  const renderProves = (provas?: any[]) => {
    if (!Array.isArray(provas) || provas.length === 0) {
      return <p>Nenhuma modalidade encontrada.</p>;
    }

    return (
      <>
        {provas.map((prove) => {
          const resumo = numerosEventoMap[String(prove.nid_prova)];

          return (
            <ProvesDetails
              key={prove.nid_prova}
              data={{
                name_prove: prove.cds_tipo_prova,
                inscricoes: resumo?.inscricoes ?? '0',
                competidores: resumo?.competidores ?? '0',
                animais: resumo?.animais ?? '0',
                premiacao:
                  resumo?.premiacao !== undefined && resumo?.premiacao !== null
                    ? `R$ ${resumo.premiacao}`
                    : 'sem premiação',
              }}
            />
          );
        })}
      </>
    );
  };

  // Effect to set the page title and path
  useEffect(() => {
    setPage({
      page_title: pageTitle,
      path: location.pathname,
    });
  }, [setPage, location]);

  useEffect(() => {
    const loadData = async () => {
      await handleGetSummary();
      await handleGetEventInfo();
    };

    loadData();
  }, [prove_id, handleGetSummary, handleGetEventInfo]);

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
    // {
    //   icon: (
    //     <TrophyIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
    //   ),
    //   label: 'top 10',
    //   onClick: () => {
    //     navigate(
    //       `/modalidade/${listToShow[0]?.nid_prova}/evento/${listToShow[0]?.nid_evento}/prova-evento/${listToShow[0]?.nid_prova_evento}/top10`
    //     );
    //   },
    //   variant: 'outline-white-25',
    // },
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
            />
          }
          hasFooterButtons
        >
          <StyledHeadingMobile>{eventInfoData?.cds_evento}</StyledHeadingMobile>

          <DivLeft>
            <InfoEventDetails data={eventInfoData} />

            <EventResumeDetails data={eventResumeNumbers} />

            <GraphSummaryDetails
              data={eventResumeData}
              isTabletOrMobile={isTabletOrMobile}
            />
          </DivLeft>

          <DivRight>
            <DivTopRight>
              <Text color={colors.white} fontSize="ssm">
                modalidades
              </Text>
            </DivTopRight>

            <ContainerDetails>{renderProves(eventResumeData.provas)}</ContainerDetails>
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

            <EventResumeDetails data={eventResumeNumbers} />

            <GraphSummaryDetails
              data={eventResumeData}
              isTabletOrMobile={isTabletOrMobile}
            />
          </DivLeft>

          <DivRight>
            <DivTopRight>
              <Text color={colors.white} fontSize="ssm">
                modalidades
              </Text>
            </DivTopRight>

            <ContainerDetails>{renderProves(eventResumeData.provas)}</ContainerDetails>
          </DivRight>
        </Scrollable>
      </ContentDektop>

      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
}

export default EventResume;
