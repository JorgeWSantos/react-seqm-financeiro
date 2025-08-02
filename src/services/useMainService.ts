import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from './api';
import type {
  ResultModalitiesResponse,
  ResultModalitiesResponseData,
} from '@src/pages/Main/types.api';

export function useMainService() {
  const getResultados = useCallback(async (): Promise<ResultModalitiesResponseData> => {
    try {
      const response = await apiResultados.get<ResultModalitiesResponse>(
        '/v1/ResultadosQtdePorModalidade'
      );

      const { data, message, success } = response.data;

      if (!success) {
        Toast.show({
          message: message || 'Ops, ocorreu um erro ao carregar as modalidades!',
          type: 'error',
          timeout: 3000,
        });
        return {
          top_modalidades: [],
          modalidades: [],
        };
      }

      return {
        top_modalidades:
          data.list_resultados_qtde_por_modalidade[0].top_modalidades || [],
        modalidades: data.list_resultados_qtde_por_modalidade[0].modalidades || [],
      };
    } catch (error) {
      Toast.show({
        message: 'Ops, ocorreu um errs!',
        type: 'error',
        timeout: 30000,
      });
      console.warn(error);
      return {
        top_modalidades: [],
        modalidades: [],
      };
    }
  }, []);

  const saveMoreSearched = useCallback(async ({ id_prova }: { id_prova: number }) => {
    try {
      await apiResultados.put(`/v1/AcessoModalidade/${id_prova}`);
    } catch (error) {
      Toast.show({
        message: 'Ops, ocorreu um erro!',
        type: 'error',
        timeout: 30000,
      });
      console.warn(error);
    }
  }, []);

  return {
    getResultados,
    saveMoreSearched,
  };
}
