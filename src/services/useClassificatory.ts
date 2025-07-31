import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from './api';
import type {
  ClassificatoryData,
  ClassificatoryResponse,
} from '@src/pages/Classificatory/types.api';

export function useClassificatory() {
  const getClassificatory = useCallback(
    async ({
      prove_event_id,
    }: {
      prove_event_id?: number | null;
    } = {}): Promise<ClassificatoryData[] | []> => {
      try {
        const response = await apiResultados.get<ClassificatoryResponse>(
          '/v1/ListaClassificacaoEtapas',
          {
            params: {
              nid_prova_evento: prove_event_id,
            },
          }
        );

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message:
              message || 'Ops, ocorreu um erro ao carregar os dados da classificação!',
            type: 'error',
            timeout: 3000,
          });

          return [];
        }

        return data.list_page_classificacao_etapas;
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao carregar os dados da classificação!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return [];
      }
    },
    []
  );

  return {
    getClassificatory,
  };
}
