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

          return {
            cds_prova_classificatoria: '',
            lista_classificacao: [],
          };
        }

        return data.list_page_product[0];
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao carregar os dados da classificação!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return {
          cds_prova_classificatoria: '',
          lista_classificacao: [],
        };
      }
    },
    []
  );

  return {
    getClassificatory,
  };
}
