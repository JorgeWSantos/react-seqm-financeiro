import type { ApiResponse } from '../types.api';

export type InfoEventData = {
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

export type InfoEventResponse = ApiResponse<{
  dados_evento: InfoEventData;
}>;
