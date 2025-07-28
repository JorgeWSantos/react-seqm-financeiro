import type { ApiResponse } from '@src/services/types.api';

export type Top10Data = {
  cds_pontuacao: string;
  nnr_classificacao_abqm: number;
  nid_inscricao: number;
  nid_prova: number;
  nid_avaliacao: number;
  nid_evento: number;
  nid_competidor: number;
  nid_animal: number;
  nid_proprietario: number;
  cds_nome_competidor: string;
  cds_tipo_prova: string;
  cds_nome_animal: string;
  proprietario: string;
  avaliacao: string;
  ccd_tipo_classificatoria: string;
  cds_modalidade: string;
  cds_filiacao: string;
  cds_evento: string;
  nid_equipe: number;
  nid_animal_pai: number;
  nid_animal_mae: number;
};

export type EventDetailsTop10 = {
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

export interface Top10ResponseData {
  top10: Array<Top10Data> | [];
  detalhe_evento: EventDetailsTop10 | null;
}

export type Top10Response = ApiResponse<{
  resultado_prova_evento: Top10ResponseData;
}>;
