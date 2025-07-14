import type { ApiResponse } from '@src/services/types.api';

//Proves

export type ResultModality = {
  nid_agrupa_evento: number;
  nid_evento: number;
  cds_empresa: string;
  cds_evento: string;
  cds_local_evento: string;
  data_inicio_evento: string; // ISO date string
  data_fim_evento: string; // ISO date string
  cds_tipo_prova: string;
  nid_empresa: number;
  cnm_cidade: string;
  cnm_estado: string;
  nid_prova: number;
  cds_mes_prova: string;
  qtde_provas: number;
  nnr_mes: number;
  bid_oficial: boolean;
};

export interface ModalityDetailsResponseData {
  eventos_nao_pontuados: Array<ResultModality> | [];
  eventos_por_mes_sem_resultado: Array<ResultModality> | [];
  eventos_por_mes: Array<ResultModality> | [];
  eventos: Array<ResultModality> | [];
}

export type ModalityDetailsResponse = ApiResponse<{
  resultado: ModalityDetailsResponseData;
}>;
