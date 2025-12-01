import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import type {
  InscriptionData,
} from './types.inscription.api';
import type { StallsData } from './types.stalls.api';

import mockinscription from './mock-inscriptions.json'
import mockstalls from './mock-stalls.json'


export function useInscriptionAndStalls() {
  const getInscriptions = useCallback(
    async ({
      nid_group_event,
      year,
    }: {
      nid_group_event: string;
      year: string;
    }): Promise<InscriptionData[] | []> => {
      try {
        console.log('params', {
          nid_group_event,
          year,
        })

        // const response = await apiFinanceiro.get<InscriptionAndStallsResponse>(
        //   '/v1/ListaClassificacaoEtapas',
        //   {
        //     params: {
        //       nid_agrupa_evento: nid_group_event,
        //       ano: year,
        //     },
        //   }
        // );

        const response = {
          data: {
            success: true,
            message: 'Sucesso',
            data: {
              list: mockinscription,
            },
          },
        }

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

        return data.list;
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
      nid_group_event,
      year,
    }: {
      nid_group_event: string;
      year: string;
    }): Promise<StallsData[] | []> => {
      try {
        console.log('params', {
          nid_group_event,
          year,
        })

        // const response = await apiFinanceiro.get<InscriptionAndStallsResponse>(
        //   '/v1/ListaClassificacaoEtapas',
        //   {
        //     params: {
        //       nid_agrupa_evento: nid_group_event,
        //       ano: year,
        //     },
        //   }
        // );

        const response = {
          data: {
            success: true,
            message: 'Sucesso',
            data: {
              list: mockstalls,
            },
          },
        }

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

        return data.list;
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
