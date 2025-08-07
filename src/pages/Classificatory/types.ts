import type { ClassificatoryData } from "@src/services/Classificatory/types.classificatory.api";

export interface Tab {
  tipo_etapa: string;
  cartao_julgamento: string;
  lista_classificacao?: ClassificatoryData[];
}
