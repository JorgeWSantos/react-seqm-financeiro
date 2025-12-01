import type { ApiResponse } from '../types.api';

export interface GroupingResponseData {
  nid_agrupa_evento: number;
  cds_agrupa_evento: string;
}

export type GroupingResponse = ApiResponse<{ list_agrupamento: GroupingResponseData[] }>;
