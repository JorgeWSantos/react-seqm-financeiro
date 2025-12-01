import type { ApiResponse } from '../types.api';

export interface AllDatesResponseData {
  ano: string;
}

export type AllDatesResponse = ApiResponse<{ list_anos: AllDatesResponseData[] }>;
