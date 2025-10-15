import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from '../api';
import type { EventResumeResponse, EventResumeResponseData } from './types.api';

export function useEventResumeService() {
  const getEventResume = useCallback(
    async ({
      // prove_id,
      event_id,
    }: {
      // prove_id?: number;
      event_id: number;
    }): Promise<EventResumeResponseData> => {
      try {
        const response = await apiResultados.get<EventResumeResponse>(
          '/v1/ResumoEvento',
          {
            params: {
              // nid_prova: prove_id,
              nid_evento: event_id,
            },
          }
        );

        //'TODO: Corrigir o tipo de numeros_evento

        console.log('Response getEventResume: ', response);
        const { data, message, success } = response.data;
        console.log('Data getEventResume: ', data);

        if (!success) {
          Toast.show({
            message: message || 'Ops, ocorreu um erro ao carregar o resumo do evento!',
            type: 'error',
            timeout: 3000,
          });

          return {
            provas: [],
            numeros_evento: [],
          };
        }

        return data.resumo_evento;
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
        };
      }
    },
    []
  );

  return {
    getEventResume,
  };
}
