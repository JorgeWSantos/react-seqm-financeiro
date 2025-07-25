export interface ModalitiesEvents {
  event: string;
  organizator: string;
  local: string;
  init: string;
  end: string;
  isOficial?: boolean; // Optional property for AQHA-specific columns
}
