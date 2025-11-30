import {
  ContentDektop,
  Dropdown,
  Header,
  HeaderNavigatorDesktop,
  TextInput,
} from '@abqm-ds/react';

import { useDeviceType } from '@abqm-ds/react';

import { ContainerHeaderDesktop, ContainerListCards, ContainerMain } from './styles';
import { SearchIcon } from '@abqm-ds/icons';
import { colors } from '@abqm-ds/tokens';
import { useCallback, useEffect, useState } from 'react';
import { Mobile } from './Mobile';
import { useMainService } from '@src/services/Main/useMainService';
import type { GroupingResponseData } from '@src/services/Main/types.api';
import { CardList } from '@src/components/CardList';
import type { AllDatesResponseData } from '@src/services/Main/types.alldates';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Main = () => {
  const pageTitle = 'Financeiro';
  const pageName = 'EVENTOS ABQM';

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsObject = Object.fromEntries([...searchParams]);

  const { isTabletOrMobile } = useDeviceType();
  const { getGrouping, getAllDates } = useMainService();

  const [groupingData, setGroupingData] = useState<GroupingResponseData[]>([]);
  const [datesList, setDatesList] = useState<AllDatesResponseData[]>([]);
  const [selectedDate, setSelectedDate] = useState<AllDatesResponseData | null>(
    paramsObject.ano ? { nnr_ano: paramsObject.ano } : null
  );
  const [nidGroupingSelected, setNidGroupingSelected] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [listToShow, setListToShow] = useState<GroupingResponseData[]>([]);

  const handleOnGoBack = useCallback(() => {
    window.history.back();
  }, []);

  const getGroupingData = useCallback(
    async ({ nnr_ano }: { nnr_ano: string }) => {
      const data = await getGrouping({ nnr_ano });
      setGroupingData(data);
    },
    [getGrouping]
  );

  const getDatesData = useCallback(async () => {
    const data = await getAllDates();
    setDatesList(data);

    if (selectedDate === null && data.length > 0) setSelectedDate(data[0]);
  }, [getAllDates, selectedDate]);

  const handleSelectGrouping = useCallback(
    ({ nid_agrupa_evento }: { nid_agrupa_evento: number }) => {
      setNidGroupingSelected(nid_agrupa_evento);
    },
    []
  );

  useEffect(() => {
    getDatesData();
  }, [getDatesData]);

  useEffect(() => {
    if (selectedDate !== null) {
      getGroupingData({
        nnr_ano: selectedDate.nnr_ano,
      });
    }
  }, [getGroupingData, selectedDate]);

  //update url params AND redirect when nidGroupingSelected changes
  useEffect(() => {
    setSearchParams(
      {
        ano: selectedDate?.nnr_ano ?? '',
        ...(nidGroupingSelected !== null
          ? { agrupamento: String(nidGroupingSelected) }
          : {}),
      },
      { replace: true }
    );

    if (nidGroupingSelected !== null) {
      navigate(`agrupamento/${nidGroupingSelected}/ano/${selectedDate?.nnr_ano}`);
      console.log('Selected Grouping ID:', nidGroupingSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, nidGroupingSelected]);

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
                label: date.nnr_ano,
                value: date.nnr_ano,
                id: date.nnr_ano,
              }))}
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
        </ContainerListCards>
      </ContentDektop>
    </ContainerMain>
  );
};

export default Main;
