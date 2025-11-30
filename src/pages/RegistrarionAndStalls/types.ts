import type { RegistrationAndStallsData } from "@src/services/RegistrarionAndStalls/types.registrationandstalls.api";

export interface Tab {
  list: RegistrationAndStallsData[] | [];
  type: 'stalls' | 'inscriptions';
}
