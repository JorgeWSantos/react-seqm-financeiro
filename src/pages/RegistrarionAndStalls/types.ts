import type { InscriptionData } from "@src/services/RegistrarionAndStalls/types.inscription.api";
import type { StallsData } from "@src/services/RegistrarionAndStalls/types.stalls.api";

export interface Tab {
  list: InscriptionData[] | StallsData[] | [];
  type: 'baias' | 'inscrições';
}
