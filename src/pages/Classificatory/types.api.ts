import type { ApiResponse } from '@src/services/types.api';

export type ClassificatoryData = {
  cds_pontuacao: string;
};

export type EventDetailsClassificatory = {
  nid_agrupa_evento: number;
  nid_evento: number;
  nid_prova_evento: number;
  nid_prova_evento_classificatoria: number;
  cds_evento: string;
  cds_modalidade: string;
  cds_url: string;
  ccd_tipo_classificatoria: string;
  nnr_passada: number;
  cds_tipo_avaliacao: string;
  bid_juvenil: boolean;
  cds_tipo_prova: string;
  dtm_data_prova: string;
  nid_prova: number;
};

export interface ClassificatoryResponseData {
  detalhe_evento: null;
}

export type ClassificatoryResponse = ApiResponse<{
  resultado_prova_evento: ClassificatoryResponseData;
}>;
