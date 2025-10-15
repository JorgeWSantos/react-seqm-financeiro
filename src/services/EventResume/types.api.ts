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
  prova?: string;
  inscricoes?: string;
  competidores?: string;
  animais?: string;
  premiacao?: string | null;
};

export type GraphStatistics = {
  nid_prova: number;
  ccd_tipo: string;
  ano: number;
  inscricoes: number;
  cds_tipo_prova: string;
  name?: string;
};

export type ProvesEventResume = {
  nid_prova: number;
  cds_tipo_prova: string;
};

export interface EventResumeResponseData {
  numeros_evento?: Array<NumberEvents> | [];
  provas?: Array<ProvesEventResume> | [];
}

export type EventResumeResponse = ApiResponse<{
  resumo_evento: EventResumeResponseData;
}>;
