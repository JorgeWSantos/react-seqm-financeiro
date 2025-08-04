import type { ApiResponse } from '@src/services/types.api';

export type TeamTop10 = {
  all_around_amador: string | null;
  all_around_jovem: string | null;
  cds_animal: string;
  cds_competidor: string;
  cds_proprietario: string;
  cds_registro_animal: string;
  cor_medalha: string;
  criador_hf: string | null;
  hall_da_fama: string | null;
  img_animal: string | null;
  modalidades_awards: string | null;
  nid_animal: number;
  nid_animal_mae: number;
  nid_animal_pai: number;
  nid_competidor: number;
  nid_inscricao: number;
  nid_proprietario: number;
  proprietario_hf: string | null;
  ranking_geral_awards: string | null;
  registro_de_merito: string;
  super_horse: string | null;
};

export type Top10Data = {
  cds_pontuacao: string;
  nnr_classificacao_abqm: number;
  nid_prova: number;
  nid_avaliacao: number;
  nid_evento: number;
  cds_tipo_prova: string;
  avaliacao: string;
  ccd_tipo_classificatoria: string;
  cds_modalidade: string;
  cds_evento: string;
  nid_equipe: number;
  equipe: TeamTop10[];
};


export type EventDetailsTop10 = {
  nid_prova_evento: number;
  cds_prova_evento: string;
  cds_prova_evento_classificatoria: string;
  dtm_data_prova: string;
  dtm_hora_inicio: string;
  dtm_hora_fim: string;
  ccd_tipo_classificatoria: string;
  cds_modalidade: string;
  cds_evento: string;
  cds_url: string;
  ccd_tipo_avaliacao: string;
  bid_juvenil: boolean;
  cds_tipo_prova: string;
};

export interface Top10ResponseData {
  top10: Array<Top10Data> | [];
  detalhe_evento: EventDetailsTop10 | null;
}

export type Top10Response = ApiResponse<{
  resultado_prova_evento: Top10ResponseData;
}>;
