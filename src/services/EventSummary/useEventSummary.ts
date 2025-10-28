import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from '../api';
import type {
  EventSummaryResponse,
  EventSummaryResponseData,
} from './types.api';

export function useEventSummary() {
  const getEventSummary = useCallback(
    async ({
      prove_id,
      event_id,
    }: {
      prove_id?: number;
      event_id: number;
    }): Promise<EventSummaryResponseData> => {
      try {
        const response = await apiResultados.get<EventSummaryResponse>(
          '/v1/ResultadoEventoProvaModalidade',
          {
            params: {
              nid_prova: prove_id,
              nid_evento: event_id,
            },
          }
        );

        //'TODO: Corrigir o tipo de numeros_evento

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message: message || 'Ops, ocorreu um erro ao carregar o resumo do evento!',
            type: 'error',
            timeout: 3000,
          });

          return {
            provas: [],
            numeros_evento: [],
            resultado_modalidade_prova: [],
            tipo_estatistica_prova: [],
          };
        }

        return data.resultado;
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao carregar o resumo do evento!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return {
          provas: [],
          numeros_evento: [],
          resultado_modalidade_prova: [],
          tipo_estatistica_prova: [],
        };
      }
    },
    []
  );

  return {
    getEventSummary,
  };
}
