import { Toast } from '@abqm-ds/react';
import { useCallback } from 'react';
import { apiResultados } from '../api';
import type {
  ClassificatoryResponse,
  ClassificatoryResponseData,
} from './types.classificatory.api';
import type {
  ClassificatoryEventDetailsResponse,
  ClassificatoryEventDetailsResponseData,
} from './types.event-details.api';

export function useClassificatory() {
  const getClassificatory = useCallback(
    async ({
      prove_event_id,
    }: {
      prove_event_id?: number | null;
    } = {}): Promise<ClassificatoryResponseData[] | []> => {
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

  const getEventDetails = useCallback(
    async ({
      prove_event_id,
      prove_event_classificatory_id,
    }: {
      prove_event_id?: number | null;
      prove_event_classificatory_id?: number | null;
    } = {}): Promise<ClassificatoryEventDetailsResponseData> => {
      try {
        const response = await apiResultados.get<ClassificatoryEventDetailsResponse>(
          '/v1/DetalheEventoProvaEvento',
          {
            params: {
              nid_prova_evento: prove_event_id,
              nid_prova_evento_classificatoria: prove_event_classificatory_id,
            },
          }
        );

        const { data, message, success } = response.data;

        if (!success) {
          Toast.show({
            message: message || 'Ops, ocorreu um erro ao carregar os dados do evento!',
            type: 'error',
            timeout: 3000,
          });

          return {
            cartao_julgamento: '',
            detalhe_evento: null,
            resumo_inscricoes: null,
          };
        }

        return data.resultado_detalhe_evento_prova_evento;
      } catch (error) {
        Toast.show({
          message: 'Ops, ocorreu um erro ao carregar os dados do evento!',
          type: 'error',
          timeout: 30000,
        });
        console.warn(error);

        return {
          cartao_julgamento: '',
          detalhe_evento: null,
          resumo_inscricoes: null,
        };
      }
    },
    []
  );

  return {
    getClassificatory,
    getEventDetails,
  };
}
