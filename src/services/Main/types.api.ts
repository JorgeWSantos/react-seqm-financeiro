import type { ApiResponse } from '../types.api';

export interface ResultModalities {
  nid_prova: number;
  cds_tipo_prova: string;
  qtde_provas: number;
  qtde_acesso: number;
}

export interface ResultModalitiesResponseData {
  modalidades: ResultModalities[];
  top_modalidades: ResultModalities[];
}

interface ResultModalitiesResponseDataData {
  list_resultados_qtde_por_modalidade: ResultModalitiesResponseData[];
}

export type ResultModalitiesResponse = ApiResponse<ResultModalitiesResponseDataData>;
