import type { InscriptionData } from "@src/services/InscriptionsAndStalls/types.inscription.api";
import type { StallsData } from "@src/services/InscriptionsAndStalls/types.stalls.api";

export interface Tab {
  list: InscriptionData[] | StallsData[] | [];
  type: 'baias' | 'inscrições';
}
