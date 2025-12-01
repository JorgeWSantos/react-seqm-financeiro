import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import type { GroupingResponse, GroupingResponseData } from '@src/services/Main/types.api';

// import mockjson from './mock-list.json';
// import mockdatesjson from './mock-dateslist.json';
import type { AllDatesResponse, AllDatesResponseData } from './types.alldates';
import { apiFinanceiro } from '../api';

export function useMainService() {
  const getGrouping = useCallback(async ({
    nnr_ano,
    id_pessoa
  }: { nnr_ano: string, id_pessoa: number }): Promise<GroupingResponseData[]> => {
    try {
      console.log('nnr_ano', nnr_ano);

      const response = await apiFinanceiro.get<GroupingResponse>(
        '/v1/Agrupamento/ListAgrupamento',
        {
          params: {
            nnr_ano,
            nid_empresa: 1, // ABQM
            nid_solicitante: id_pessoa
          }
        }
      );

      const { data, message, success } = response.data;

      // data.list = mockjson;

      if (!success) {
        Toast.show({
          message: message || 'Ops, ocorreu um erro ao carregar as modalidades!',
          type: 'error',
          timeout: 3000,
        });
        return [];
      }

      return data.list_agrupamento;
    } catch (error) {
      Toast.show({
        message: 'Ops, ocorreu um erro ao carregar os resultados!',
        type: 'error',
        timeout: 30000,
      });
      console.warn(error);
      return [];
    }
  }, []);

  const getAllDates = useCallback(async (): Promise<AllDatesResponseData[]> => {
    const response = await apiFinanceiro.get<AllDatesResponse>(
      'v1/Ano/ListAnos'
    );

    const { data, message, success } = response.data;

    if (!success) {
      Toast.show({
        message: message || 'Ops, ocorreu um erro ao carregar os anos!',
        type: 'error',
        timeout: 3000,
      });
      return [];
    }

    return data.list_anos.reverse();
    // return mockdatesjson;
  }, []);


  return {
    getGrouping,
    getAllDates,
  };
}
