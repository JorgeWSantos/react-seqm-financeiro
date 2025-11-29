import type { ApiResponse } from '@src/services/types.api';

// export type EventDetailsData = {
//   cds_evento: string;
//   organizador: string;
//   local: string;
//   estado: string;
//   data_inicio: string;
//   data_fim: string;
//   logotipo: string;
//   nid_agrupa_evento: number;
//   bid_oficial: boolean;
// };

export type ClassificatoryEventData = {
  bid_juvenil: boolean;
  ccd_tipo_classificatoria: string;
  cds_evento: string;
  cds_modalidade: string;
  cds_tipo_avaliacao: string;
  cds_tipo_prova: string;
  cds_url: string;
  dtm_data_prova: string;
  nid_agrupa_evento: number;
  nid_evento: number;
  nid_prova: number;
  nid_prova_evento: number;
  nid_prova_evento_classificatoria: number;
  nnr_passada: number;
};


export type ClassificatoryInscriptionsResumeData = {
  nn_qtde_base_pontuacao: number;
  nnr_qtde_inscricoes: number;
  nnr_qtde_inscricoes_passadas: number;
  nnr_qtde_competidores: number;
  nnr_qtde_animais: number;
  nnr_qtde_passadas: number;
  nvl_premiacao: number;
  nnr_qtde_inscricoes_aqha: number;
  nnr_qtde_inscricoes_nucleo: number;
  nnr_qtde_pessoas_nucleo: number;
  nnr_qtde_pessoas_aqha: number;
  nnr_qtde_animais_nucleo: number;
  nnr_qtde_animais_aqha: number;
  nnr_qtde_inscricoes_passadas_nucleo: number;
  nnr_qtde_inscricoes_passadas_aqha: number;
};

export type ClassificatoryJudgmentCardData = {
  cds_url_cartao_julgamento_classificatoria: string;
  cds_url_cartao_julgamento_final: string;
};

export type ClassificatoryEventDetailsResponseData = {
  detalhe_evento: ClassificatoryEventData | null;
  resumo_inscricoes: ClassificatoryInscriptionsResumeData | null;
  cartao_julgamento: ClassificatoryJudgmentCardData | null;
};

export type ClassificatoryEventDetailsResponse = ApiResponse<{
  resultado_detalhe_evento_prova_evento: ClassificatoryEventDetailsResponseData;
}>;