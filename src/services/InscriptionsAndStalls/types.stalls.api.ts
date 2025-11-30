import type { ApiResponse } from '@src/services/types.api';

export type StallsData = {
  cds_nome_animal: string;
  cds_situacao_baia: string;
  nnr_valor_baia: number;
  cds_tipo_baia: string;
};

export type StallsResponse = ApiResponse<{
  list: Array<StallsData> | [];
}>;
