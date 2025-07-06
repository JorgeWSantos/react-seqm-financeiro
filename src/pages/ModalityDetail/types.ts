import type { ApiResponse } from '@src/services/types.api';

//Proves

export type Modality = {
  nid_prova: number;
  cds_tipo_prova: string;
  qtde_provas: number;
  qtde_participantes: number;
};

export interface ModalitiesResponseData {
  top10: Modality[];
  modalidades: Modality[];
}

export type ModalitiesResponse = ApiResponse<ModalitiesResponseData>;
