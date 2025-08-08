import {
  ActivityIndicator,
  AnimalTableData,
  CompetitorTableData,
  ContentDektop,
  ContentMobile,
  getNameProveById,
  Header,
  HeaderMobileNavigator,
  HeaderNavigatorDesktop,
  OwnerTableData,
  ShareOptions,
  TableSEQM,
  Text,
  TextInput,
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
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '@src/contexts/page/usePage';
import { PrinterIcon, SearchIcon, ShareIcon } from '@abqm-ds/icons';
import { colors, fonts } from '@abqm-ds/tokens';
import { useTop10 } from '@src/services/Top10/useTop10';
import type { Top10Data, EventDetailsTop10 } from '../../services/Top10/types.api';
import { useParams } from 'react-router';

import MedalTop10 from '@src/assets/images/medal-top10.svg';

function Top10() {
  const params = useParams();
  const prove_id = params.prove_id;
  const prove_event_id = params.prove_event_id;
  const event_id = params.event_id;

  const pageTitle = 'Resultados »';
  const subTitle = getNameProveById(Number(prove_id)) + ' » TOP 10';

  const navigate = useNavigate();
  const location = useLocation();

  const { setPage } = usePage();
  const { isTabletOrMobile } = useDeviceType();
  const { getTop10 } = useTop10();
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState<Top10Data[]>([]);
  const [listToShow, setListToShow] = useState<Top10Data[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;

  const [eventInfoData, setEventInfoData] = useState<EventDetailsTop10 | null>(
    {} as EventDetailsTop10
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

    setEventInfoData(data.detalhe_evento);
    setIsLoading(false);
  }, [getTop10, prove_event_id]);

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
  }, [handleGetResultsTop10]);

  const columns: Array<TableColumnSEQM> = [
    {
      key: 'abqm',
      label: 'ABQM',
      width: '6%',
      align: 'center',
    },
    { key: 'competitor', label: 'COMPETIDOR', width: '30%' },
    {
      key: 'animal',
      label: 'ANIMAL',
      width: '24%',
      align: 'left',
    },
    {
      key: 'owner',
      label: 'PROPRIETÁRIO',
      width: '30%',
      align: 'left',
    },
    {
      key: 'tn',
      label: 'T/N',
      align: 'center',
      width: '10%',
    },
  ];

  const data: Array<TableRowSEQM> = listToShow.map((item, index) => ({
    abqm: { value: `${index + 1}°` },
    competitor: {
      render: () => {
        return item.equipe.map((e) => <CompetitorTableData value={e.cds_competidor} />);
      },
    },
    animal: {
      render: () => {
        return (
          <>
            {item.equipe.map((e) => (
              <AnimalTableData
                idAnimal={e.nid_animal}
                nameAnimal={e.cds_animal}
                imgAnimal={e.img_animal}
                isHallOfFameAnimal={e.hall_da_fama}
                // isHallOfFameAnimal={'2014'}
                // isHallOfFameAnimal={e.hall_da_fama || (i === 0 ? '2017' : null)}
                medal={e.cor_medalha}
                registerAnimal={'P000000'}
              />
            ))}
          </>
        );
      },
    },
    owner: {
      render: () => {
        return item.equipe.map((e) => (
          <OwnerTableData
            // isHallOfFameOwner={e.proprietario_hf || (i === 0 ? '2017' : null)}
            isHallOfFameOwner={e.proprietario_hf}
            value={e.cds_proprietario}
          />
        ));
      },
    },
    tn: { value: item.cds_pontuacao },
  }));

  const buttonsHeader = [
    {
      icon: (
        <PrinterIcon fill={isTabletOrMobile ? colors.white50 : colors.emeraldGreen50} />
      ),
      label: 'imprimir',
      onClick: () => {},
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

  return (
    <ContainerMain>
      {!isTabletOrMobile ? (
        <ContentDektop
          header={<Header text={pageTitle} subTitle={subTitle} buttons={buttonsHeader} />}
          headerNavigator={
            <HeaderNavigatorDesktop
              title={eventInfoData?.cds_evento || ''}
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
      ) : (
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
      )}
      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMain>
  );
}

export default Top10;
