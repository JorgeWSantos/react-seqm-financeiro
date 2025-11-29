import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import type { GroupingResponseData } from '@src/services/Main/types.api';

import mockjson from './mock-list.json';
import mockdatesjson from './mock-dateslist.json';
import type { AllDatesResponseData } from './types.alldates';

export function useMainService() {
  const getGrouping = useCallback(async ({
    nnr_ano
  }: { nnr_ano: string }): Promise<GroupingResponseData[]> => {
    try {
      console.log('nnr_ano', nnr_ano);
      // const nid_empresa = 1;
      // const token = ''; // normalmente já está setado no axios instance

      // const response = await apiResultados.get<GroupingResponse>(
      //   '/v1/ResultadosQtdePorModalidade'
      // );

      const response = {
        data: {
          data: { list: mockjson },
          message: 'Success',
          success: true
        },
      }


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

      return data.list;
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
    // Implement API call to fetch all dates
    return mockdatesjson;
  }, []);


  return {
    getGrouping,
    getAllDates,
  };
}
