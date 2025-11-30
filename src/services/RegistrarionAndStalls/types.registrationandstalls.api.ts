import type { ApiResponse } from '@src/services/types.api';

export type RegistrationAndStallsData = {
  id_equipe: number;
  cds_modalidade: string;
  dtm_data_prova: string;
  nrv_total_inscricao: number;
  situacao_inscricao: string;
  nnr_classificacao_abqm: number;
  cds_pontuacao: string | null;
  nvl_pontuacao: number;
  cds_nome_animal: string;
  cds_nome_competidor: string;
  cds_evento: string;
  bid_aqha: boolean;
  cds_aqha: string;
};

export type RegistrationAndStallsResponse = ApiResponse<{
  list: Array<RegistrationAndStallsData> | [];
}>;
