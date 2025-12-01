import {
  ContentDektop,
  Dropdown,
  Header,
  HeaderNavigatorDesktop,
  LoadingOverlay,
  Text,
  TextInput,
  type DataDropdown,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerHeaderDesktop, ContainerListCards, ContainerMain } from './styles';
import { SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Mobile } from './Mobile';
import { useMainService } from '@src/services/Main/useMainService';
import type { GroupingResponseData } from '@src/services/Main/types.api';
import { CardList } from '@src/components/CardList';
import type { AllDatesResponseData } from '@src/services/Main/types.alldates';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@src/contexts/auth/useAuth';

const Main = () => {
  const pageTitle = 'Financeiro';
  const pageName = 'EVENTOS ABQM';

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const paramsObject = Object.fromEntries([...searchParams]);

  const { isTabletOrMobile } = useDeviceType();
  const { getGrouping, getAllDates } = useMainService();

  const [groupingData, setGroupingData] = useState<GroupingResponseData[]>([]);
  const [datesList, setDatesList] = useState<AllDatesResponseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initialYear = useMemo(() => {
    return paramsObject.ano ? paramsObject.ano : new Date().getFullYear().toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedDate, setSelectedDate] = useState<DataDropdown>({
    id: initialYear,
    label: initialYear,
    value: initialYear,
  });

  const [nidGroupingSelected, setNidGroupingSelected] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [listToShow, setListToShow] = useState<GroupingResponseData[]>([]);

  const handleOnGoBack = useCallback(() => {
    window.history.back();
  }, []);

  const getGroupingData = useCallback(
    async ({ nnr_ano, id_pessoa }: { nnr_ano: string; id_pessoa: number }) => {
      const data = await getGrouping({
        nnr_ano: nnr_ano,
        id_pessoa: id_pessoa,
      });

      setGroupingData(data);
      setIsLoading(false);
    },
    [getGrouping]
  );

  const getDatesData = useCallback(async () => {
    const data = await getAllDates();
    setDatesList(data);

    const currentYear = initialYear || new Date().getFullYear().toString();

    setSelectedDate({
      id: currentYear,
      label: currentYear,
      value: currentYear,
    });
  }, [getAllDates, initialYear]);

  const handleSelectGrouping = useCallback(
    ({ nid_agrupa_evento }: { nid_agrupa_evento: number }) => {
      setNidGroupingSelected(nid_agrupa_evento);
    },
    []
  );

  const updateUrlParams = useCallback(() => {
    setSearchParams(
      {
        ano: selectedDate?.value ?? '',
        ...(nidGroupingSelected !== null
          ? { agrupamento: String(nidGroupingSelected) }
          : {}),
      },
      { replace: true }
    );
  }, [nidGroupingSelected, selectedDate, setSearchParams]);

  useEffect(() => {
    getDatesData();
  }, [getDatesData]);

  useEffect(() => {
    if (selectedDate !== null && user !== null) {
      getGroupingData({
        nnr_ano: selectedDate.value,
        id_pessoa: user.id_pessoa,
      });
    }
  }, [getGroupingData, selectedDate, user]);

  // update url params AND redirect when nidGroupingSelected changes
  useEffect(() => {
    updateUrlParams();

    if (nidGroupingSelected !== null) {
      navigate(`agrupamento/${nidGroupingSelected}/ano/${selectedDate?.value}`);
      console.log('Selected Grouping ID:', nidGroupingSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, nidGroupingSelected, updateUrlParams]);

  // filter
  useEffect(() => {
    if (searchValue.trim() === '') {
      setListToShow(groupingData);
      return;
    }

    const filteredData = groupingData.filter((item) => {
      const matchFilter = `${item.nid_agrupa_evento} - ${item.cds_agrupa_evento}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return matchFilter;
    });

    setListToShow(filteredData);
  }, [searchValue, groupingData]);

  if (isTabletOrMobile) {
    return <Mobile pageName={pageName} handleOnGoBack={handleOnGoBack} />;
  }

  return (
    <ContainerMain>
      <ContentDektop
        header={<Header text={pageTitle} />}
        contentBoxStyles={{
          padding: '1.5rem',
          gap: '0.25rem',
          paddingBottom: 0,
        }}
        footerType="medium"
      >
        <HeaderNavigatorDesktop title={pageName} hasBackButton onGoBack={handleOnGoBack}>
          <ContainerHeaderDesktop>
            <Dropdown
              data={datesList.map((date) => ({
                label: date.ano,
                value: date.ano,
                id: date.ano,
              }))}
              setValue={(data) => {
                setSelectedDate(data);
                updateUrlParams();
              }}
              value={selectedDate}
              maxWidth="100px"
            />
            <TextInput
              placeholder="Buscar"
              onChange={(v) => setSearchValue(v.target.value)}
              icon={<SearchIcon fill={colors.white75} />}
              debounceDelay={1000}
              style={{
                width: '100%',
              }}
            />
          </ContainerHeaderDesktop>
        </HeaderNavigatorDesktop>

        <ContainerListCards>
          {listToShow.map((item, idx) => (
            <CardList
              key={item.nid_agrupa_evento}
              value={`${item.nid_agrupa_evento} - ${item.cds_agrupa_evento}`}
              isEven={idx % 2 === 0}
              onClick={() => {
                handleSelectGrouping({ nid_agrupa_evento: item.nid_agrupa_evento });
              }}
            />
          ))}

          {listToShow.length === 0 && !isLoading && (
            <Text fontWeight="semiBold" color={colors.emeraldGreen75}>
              Nenhum agrupamento encontrado.
            </Text>
          )}

          {isLoading && <LoadingOverlay withoutBackground />}
        </ContainerListCards>
      </ContentDektop>
    </ContainerMain>
  );
};

export default Main;
