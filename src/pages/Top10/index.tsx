import {
  ActivityIndicator,
  AnimalTableData,
  CompetitorTableData,
  ContentDektop,
  ContentMobile,
  FooterWithButtons,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  OwnerTableData,
  ShareOptions,
  TableSEQM,
  Text,
  TextInput,
  type FooterWithButtonsPropsType,
  type TableColumnSEQM,
  type TableRowSEQM,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import {
  ContainerMain,
  LoadingContainer,
  NotFoundContainer,
  Scrollable,
  EventHeader,
} from './styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { PrinterIcon, SearchIcon, ShareIcon } from '@abqm-ds/icons';
import { colors, fonts } from '@abqm-ds/tokens';
import { useTop10 } from '@src/services/Top10/useTop10';
import type { Top10Data } from '../../services/Top10/types.api';
import { useParams } from 'react-router';

import MedalTop10 from '@src/assets/images/medal-top10.svg';
import PrintArea from '@src/components/PrintArea';
import type { PrintHeaderProps } from '@src/components/PrintArea/PrintHeader';
import { useInfoEvent } from '@src/services/General/useInfoEvent';
import type { InfoEventData } from '@src/services/General/types.info-event.api';
import { ContainerMainMobile } from '../EventSummary/styles';
import { urlConsultaAnimal, urlRanking } from '@src/config/env';

function Top10() {
  const params = useParams();
  const prove_id = params.prove_id;
  const prove_event_id = params.prove_event_id;
  const event_id = params.event_id;

  const pageTitle = 'Resultados';
  const subTitle = '';

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getTop10 } = useTop10();
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState<Top10Data[]>([]);
  const [listToShow, setListToShow] = useState<Top10Data[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const printAreaRef = useRef<{ print: () => void }>(null);
  const { getInfoEvent } = useInfoEvent();

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  const [eventInfoData, setEventInfoData] = useState<InfoEventData | null>(
    {} as InfoEventData
  );

  const handleGetResultsTop10 = useCallback(async () => {
    if (!prove_event_id) {
      return;
    }

    const data = await getTop10({
      prove_event_id: Number(prove_event_id),
    });

    setAllList(data.top10);
    setListToShow(data.top10);

    setIsLoading(false);
  }, [getTop10, prove_event_id]);

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

  // Effect to filter the list based on searchValue
  useEffect(() => {
    if (searchValue.trim() === '') {
      setListToShow(allList);
      return;
    }

    const filteredList = allList.filter(
      (item) =>
        item.cds_pontuacao?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.equipe?.some(
          (equipeItem) =>
            equipeItem.cds_competidor
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            equipeItem.cds_animal?.toLowerCase().includes(searchValue.toLowerCase()) ||
            equipeItem.cds_proprietario?.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    setListToShow(filteredList);
  }, [searchValue, allList]);

  useEffect(() => {
    handleGetResultsTop10();
    handleGetEventInfo();
  }, [handleGetResultsTop10, handleGetEventInfo]);

  const columns: Array<TableColumnSEQM> = [
    {
      key: 'abqm',
      label: 'ABQM',
      width: '6%',
      minWidth: '4rem',
      align: 'center',
      sortable: true,
    },
    { key: 'competitor', label: 'COMPETIDOR', width: '30%', sortable: true },
    {
      key: 'animal',
      label: 'ANIMAL',
      width: '24%',
      align: 'left',
      sortable: true,
    },
    {
      key: 'owner',
      label: 'PROPRIETÁRIO',
      width: '30%',
      align: 'left',
      sortable: true,
    },
    {
      key: 'tn',
      label: 'T/N',
      align: 'center',
      width: '10%',
      sortable: true,
    },
  ];

  const data: Array<TableRowSEQM> = listToShow.map((item) => ({
    abqm: { value: `${item.nnr_classificacao_abqm}°` },
    competitor: {
      value: item.equipe[0]?.cds_competidor || '', // to sort
      render: () => {
        return item.equipe.map((e) => (
          <CompetitorTableData
            value={e.cds_competidor}
            onClick={() => {
              window.location.href =
                urlRanking + `/competidor/detalhe/${e.nid_competidor}`;
            }}
          />
        ));
      },
    },
    animal: {
      value: item.equipe[0]?.cds_animal || '', // to sort
      render: () => {
        return (
          <>
            {item.equipe.map((e) => (
              <AnimalTableData
                idAnimal={e.nid_animal}
                nameAnimal={e.cds_animal}
                imgAnimal={e.img_animal}
                isHallOfFameAnimal={e.hall_da_fama}
                onClick={() => {
                  window.location.href =
                    urlConsultaAnimal + `/perfil-do-animal/campanha/${e.nid_animal}`;
                }}
                medal={e.cor_medalha}
                registerAnimal={'P000000'}
              />
            ))}
          </>
        );
      },
    },
    owner: {
      value: item.equipe[0]?.cds_proprietario || '', // to sort
      render: () => {
        return item.equipe.map((e) => (
          <OwnerTableData
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
    tn: { value: item.cds_pontuacao },
  }));

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

  const buttonsMobileFooter: FooterWithButtonsPropsType = [
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
            maxWidth: '100vw',
            overflow: 'visible',
          }}
          headerMobileNavigator={
            <HeaderMobileNavigator
              hasBackButton
              onGoBack={() => navigate('/')}
              headingText={getNameProveById(Number(prove_id))}
              hasSearch
              onChangeSearch={(v) => setSearchValue(v.target.value)}
            />
          }
          hasFooterButtons
        >
          <EventHeader>
            <img src={MedalTop10} width={70} height={70} alt="Medalha Top 10" />

            <Text
              fontSize="xl"
              fontWeight="regular"
              color={colors.green900}
              lineHeight="initial"
              // fontFamily={fonts.secondary}
              style={{ fontFamily: fonts.secondary, letterSpacing: '-2px' }}
            >
              {eventInfoData?.cds_evento || 'Classificação'}
            </Text>
          </EventHeader>
          <Scrollable>
            {data.length > 0 ? (
              <TableSEQM data={data} columns={columns} width={'70rem'} />
            ) : (
              <>
                {isLoading ? (
                  <LoadingContainer>
                    <ActivityIndicator width={20} height={20} />
                  </LoadingContainer>
                ) : (
                  <NotFoundContainer>
                    <Text
                      fontSize="smm"
                      fontWeight="semiBold"
                      color={colors.emeraldGreen75}
                    >
                      Nenhum resultado encontrado
                    </Text>
                  </NotFoundContainer>
                )}
              </>
            )}
          </Scrollable>
        </ContentMobile>

        <FooterWithButtons footerButtonsMobile={buttonsMobileFooter} />
      </ContainerMainMobile>
    );
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={pageTitle} subTitle={subTitle} buttons={buttonsHeader} />}
        headerNavigator={
          <HeaderNavigatorDesktop
            title={getNameProveById(Number(prove_id)).toUpperCase() + '  •  TOP 10'}
            subtitle={eventInfoData?.cds_evento || ''}
            hasBackButton
            onGoBack={() => navigate('/modalidade/' + prove_id + '/evento/' + event_id)}
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
          overflow: 'visible',
        }}
        count={data.length}
      >
        <Scrollable>
          {data.length > 0 ? (
            <TableSEQM data={data} columns={columns} />
          ) : (
            <>
              {isLoading ? (
                <LoadingContainer>
                  <ActivityIndicator width={20} height={20} />
                </LoadingContainer>
              ) : (
                <NotFoundContainer>
                  <Text
                    fontSize="smm"
                    fontWeight="semiBold"
                    color={colors.emeraldGreen75}
                  >
                    Nenhum resultado encontrado
                  </Text>
                </NotFoundContainer>
              )}
            </>
          )}
        </Scrollable>
      </ContentDektop>

      {data?.length > 0 && (
        <PrintArea
          ref={printAreaRef}
          title={'RESULTADO TOP 10'}
          columns={columns}
          data={data}
          cards={[]}
          info={printInfo}
          totalForPage={
            listToShow[0].equipe.length === 1
              ? 18
              : listToShow[0].equipe.length > 2
              ? 7
              : 9
          }
        />
      )}

      {showShareOptions && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
}

export default Top10;
