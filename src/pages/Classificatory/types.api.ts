import type { ApiResponse } from '@src/services/types.api';

export type ClassificatoryData = {
  nid_equipe: number;
  cds_ordem_entrada: string;
  cds_classificacao: string;
  cds_classificacao_aqha: string;
  cds_classificacao_castrado: string;
  cds_classificacao_nucleo: string;
  cds_classificacao_d: string;
  cds_media: string;
  cds_pontuacoes: string;
  cds_media_final: string;
  cds_media_aqha: string;
  cds_media_final_nucleo: string;
  bid_aqha: boolean;
  bid_castrado: boolean;
  bid_nucleo: boolean;
  bid_abqm: boolean;
  qtde_competidores: number;
  bid_nucleo_participa_abqm: boolean;
  nnr_senha: number | null;
  nnr_bois: number | null;
  boi_virado: number;
  nid_treinador: number;
  nvl_premiacao_corrida: number;
  indice_velocidade: number;
  nvl_tempo_corrida: number;
  nome_treinador: string | null;
};

export interface ClassificatoryResponseData {
  cds_prova_classificatoria: string;
  lista_classificacao: ClassificatoryData | [];
}

export type ClassificatoryResponse = ApiResponse<{
  list_page_product: Array<ClassificatoryResponseData>;
}>;
