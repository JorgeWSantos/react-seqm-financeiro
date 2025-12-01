import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import type {
  InscriptionData,
  InscriptionResponse,
} from './types.inscription.api';
import type { StallsData, StallsResponse } from './types.stalls.api';

import { apiFinanceiro } from '../api';


export function useInscriptionAndStalls() {
  const getInscriptions = useCallback(
    async ({
      nnr_ano,
      id_pessoa,
      nid_agrupa_evento
    }: {
      nnr_ano: string;
      id_pessoa: number;
      nid_agrupa_evento: number;
    }): Promise<InscriptionData[] | []> => {
      try {
        const response = await apiFinanceiro.get<InscriptionResponse>(
          '/v1/InscricoesSolicitante/ListInscricoesSolicitante',
          {
            params: {
              nnr_ano,
              nid_agrupa_evento,
              nid_solicitante: id_pessoa
            }
          }
        );

        console.log('response', response);

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

        return data.list_inscricoes_solicitante;
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

  const getStalls = useCallback(
    async ({
      nnr_ano,
      id_pessoa,
      nid_agrupa_evento
    }: {
      nnr_ano: string;
      id_pessoa: number;
      nid_agrupa_evento: number;
    }): Promise<StallsData[] | []> => {
      try {

        console.log('Fetching stalls with params:', {
          nnr_ano,
          id_pessoa,
          nid_agrupa_evento
        });

        const response = await apiFinanceiro.get<StallsResponse>(
          '/v1/InscricoesSolicitanteBaias/ListInscricoesSolicitanteBaias',
          {
            params: {
              nnr_ano,
              nid_agrupa_evento,
              nid_solicitante: id_pessoa
            }
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

        return data.list_inscricoes_solicitante_baias;
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
    getInscriptions,
    getStalls
  };
}
