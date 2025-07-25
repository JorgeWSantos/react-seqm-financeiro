import type { ApiResponse } from '@src/services/types.api';

export type Top10Data = {
  nid_agrupa_evento: number;
};

export interface Top10ResponseData {
  eventos_nao_pontuados: Array<Top10Data> | [];
}

export type Top10Response = ApiResponse<{
  resultado: Top10ResponseData;
}>;
