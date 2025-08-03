import type { ApiResponse } from '@src/services/types.api';

export type EventDetailsData = {
  cds_evento: string;
  organizador: string;
  local: string;
  estado: string;
  data_inicio: string;
  data_fim: string;
  logotipo: string;
  nid_agrupa_evento: number;
  bid_oficial: boolean;
};

export type InscriptionsResumeData = {
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

export type EventDetailsResponseData = {
  detalhe_evento: EventDetailsData | null;
  resumo_inscricoes: InscriptionsResumeData | null;
  cartao_julgamento: string;
};

export type EventDetailsResponse = ApiResponse<{
  resultado_detalhe_evento_prova_evento: EventDetailsResponseData;
}>;
