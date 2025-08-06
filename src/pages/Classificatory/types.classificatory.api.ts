import type { ApiResponse } from '@src/services/types.api';

export type TeamClassificatory = {
  all_around_amador: string | null;
  all_around_jovem: string | null;
  bid_abqm: boolean;
  bid_animal_nucleo: boolean;
  bid_aqha: boolean;
  bid_castrado: boolean;
  bid_competidor_nucleo: boolean;
  bid_esteira: boolean;
  cds_animal: string;
  cds_competidor: string;
  cds_criador: string;
  cds_proprietario: string;
  conquistas: string[];
  cor_medalha: string;
  criador_hf: string | null;
  hall_da_fama: string | null;
  img_animal: string | null;
  modalidades_awards: string | null;
  nid_animal: number;
  nid_competidor: number;
  nid_criador: number;
  nid_proprietario: number;
  nnr_senha: number | null;
  proprietario_hf: string | null;
  ranking_geral_awards: string | null;
  registro_de_merito: string;
  super_horse: string | null;
};

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
  // equipe: TeamClassificatory[];
  equipe: TeamClassificatory[];
};


export type ClassificatoryResponseData = {
  cartao_julgamento: string;
  lista_classificacao: Array<ClassificatoryData> | [];
  tipo_etapa: string;
};

export type ClassificatoryResponse = ApiResponse<{
  list_page_classificacao_etapas: Array<ClassificatoryResponseData> | [];
}>;
