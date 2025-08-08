import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from '../api';
import type {
  InfoEventData,
  InfoEventResponse,
} from './types.info-event.api';

export function useInfoEvent() {

  const getInfoEvent = useCallback(
    async ({ event_id }: { event_id: number }): Promise<InfoEventData | null> => {
      try {
        const response = await apiResultados.get<InfoEventResponse>(
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
    getInfoEvent,
  };
}
