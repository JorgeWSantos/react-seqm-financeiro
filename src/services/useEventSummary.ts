import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from './api';
import type {
  EventSummaryResponse,
  EventSummaryResponseData,
  InfoEventSummaryData,
  InfoEventSummaryResponse,
} from '@src/pages/EventSummary/types.api';

export function useEventSummary() {
  const getEventSummary = useCallback(
    async ({
      prove_id,
      event_id,
    }: {
      prove_id: number;
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

        console.warn(
          'TODO: Corrigir o tipo de numeros_evento para um objeto único e não um array'
        );

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message: message || 'Ops, ocorreu um erro ao carregar o resumo do evento!',
            type: 'error',
            timeout: 3000,
          });

          return {
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
          numeros_evento: [],
          resultado_modalidade_prova: [],
          tipo_estatistica_prova: [],
        };
      }
    },
    []
  );

  const getInfoEvent = useCallback(
    async ({ event_id }: { event_id: number }): Promise<InfoEventSummaryData | null> => {
      try {
        const response = await apiResultados.get<InfoEventSummaryResponse>(
          '/v1/DadosEvento',
          {
            params: {
              nid_evento: event_id,
            },
          }
        );

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message: message || 'Ops, ocorreu um erro ao carregar os detalhes do evento!',
            type: 'error',
            timeout: 3000,
          });

          return null;
        }

        return data.dados_evento;
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao carregar os detalhes do evento!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return null;
      }
    },
    []
  );

  return {
    getEventSummary,
    getInfoEvent,
  };
}
