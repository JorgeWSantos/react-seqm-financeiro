import type { ApiResponse } from '../types.api';

//Proves

export type ResultModalityByProve = {
  nid_evento: number;
  nid_modalidade: number;
  cds_modalidade: string;
  nid_prova: number;
  cds_tipo_prova: string;
  participantes: number;
  nid_prova_evento_classificatoria: number;
  nid_agrupa_evento: number;
  nid_prova_evento: number;
  cds_evento: string;
  cds_status_organizador: boolean;
  cds_status_juiz: boolean;
  cds_status_abqm: boolean;
  nid_ranking_prova: number;
};

export type NumberEvents = {
  inscricoes: string;
  competidores: string;
  animais: string;
  premiacao: string | null;
};

export type GraphStatistics = {
  nid_prova: number;
  ccd_tipo: string;
  ano: number;
  inscricoes: number;
};

export type ProvesEventSummary = {
  nid_prova: number;
  cds_tipo_prova: string;
};

export interface EventSummaryResponseData {
  resultado_modalidade_prova: Array<ResultModalityByProve> | [];
  numeros_evento: Array<NumberEvents> | [];
  tipo_estatistica_prova: Array<GraphStatistics> | [];
  provas: Array<ProvesEventSummary> | [];
}

export type EventSummaryResponse = ApiResponse<{
  resultado: EventSummaryResponseData;
}>;