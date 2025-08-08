import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from '../api';
import type {
  ModalityDetailsResponse,
  ModalityDetailsResponseData,
} from './types.api';

export function useModalityDetails() {
  const getModalityDetails = useCallback(
    async ({
      prove_id,
      year,
      month,
    }: {
      prove_id?: number | null;
      month?: string;
      year?: string;
    } = {}): Promise<ModalityDetailsResponseData> => {
      try {
        const response = await apiResultados.get<ModalityDetailsResponse>(
          '/v1/ResultadoPorModalidade',
          {
            params: {
              id_prova: prove_id,
              ano: year,
              ...(!!month && { mes: month }),
            },
          }
        );

        console.log('response', response);

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message:
              message || 'Ops, ocorreu um erro ao carregar os detalhes da modalidade!',
            type: 'error',
            timeout: 3000,
          });

          return {
            eventos: [],
            eventos_nao_pontuados: [],
            eventos_por_mes_sem_resultado: [],
            eventos_por_mes: [],
          };
        }

        return data.resultado;
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao buscar as informações!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return {
          eventos: [],
          eventos_nao_pontuados: [],
          eventos_por_mes_sem_resultado: [],
          eventos_por_mes: [],
        };
      }
    },
    []
  );

  return {
    getModalityDetails,
  };
}
