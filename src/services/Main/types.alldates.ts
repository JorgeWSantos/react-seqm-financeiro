import type { ApiResponse } from '../types.api';

export interface AllDatesResponseData {
  nnr_ano: string;
}

export type AllDatesResponse = ApiResponse<{ list: AllDatesResponseData[] }>;
