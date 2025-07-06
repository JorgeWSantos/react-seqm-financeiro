import { Toast } from '@abqm-ds/react';
import { modalidades } from '@src/pages/Main/mock-modalidades.ts';
import type { ModalitiesResponseData } from '@src/pages/Main/types.ts';
import { useCallback } from 'react';

export function useResultsService() {
  const getResultados = useCallback(async (): Promise<ModalitiesResponseData> => {
    try {
      console.warn('TODO: implementar lógica de carregamento de modalidades');

      // const response = await apiCalendario.get<CalendarResponse>(
      //   '/v1/PortalCalendarioAgrupamento',
      //   {
      //     params: {
      //       ...(!!nid_prova && { nid_prova: Number(nid_prova) }),
      //       ...(!!uf && { uf }),
      //     },
      //   }
      // );

      return {
        top10: modalidades.slice(0, 6),
        modalidades: modalidades.slice(10, modalidades.length),
      };
    } catch (error) {
      Toast.show({
        message: 'Ops, ocorreu um erro ao carregar as modalidades!',
        type: 'error',
        timeout: 3000,
      });
      console.warn(error);
      return {
        top10: [],
        modalidades: [],
      };
    }
  }, []);

  return {
    getResultados,
  };
}
