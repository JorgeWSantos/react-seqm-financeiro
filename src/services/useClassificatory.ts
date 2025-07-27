import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from './api';
import type {
  ClassificatoryResponse,
  ClassificatoryResponseData,
} from '@src/pages/Classificatory/types.api';

export function useClassificatory() {
  const getClassificatory = useCallback(
    async ({
      prove_event_id,
    }: {
      prove_event_id?: number | null;
    } = {}): Promise<ClassificatoryResponseData> => {
      try {
        const response = await apiResultados.get<ClassificatoryResponse>(
          '/v1/ResultadoProvaEvento',
          {
            params: {
              nid_prova_evento: prove_event_id,
            },
          }
        );

        console.log('Response from Classificatory:', response);

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message: message || 'Ops, ocorreu um erro ao carregar os dados do top 10!',
            type: 'error',
            timeout: 3000,
          });

          return {
            detalhe_evento: null,
          };
        }

        return (
          data.resultado_prova_evento || {
            top10: [],
            detalhe_evento: null,
          }
        );
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao buscar as informações!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return {
          detalhe_evento: null,
        };
      }
    },
    []
  );

  return {
    getClassificatory,
  };
}
