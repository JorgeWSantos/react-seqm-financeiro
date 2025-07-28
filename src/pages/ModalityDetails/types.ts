import type { DataDropdown, RadioGroupOption } from '@abqm-ds/react';

export interface ModalitiesEvents {
  event: string;
  organizator: string;
  local: string;
  init: string;
  end: string;
  isOficial?: boolean; // Optional property for AQHA-specific columns

  // not showed on table
  event_id?: number; // Optional property for event ID
  organizator_id?: number; // Optional property for organizator ID
  event_group_id?: number; // Optional property for event group ID
  prove_id?: number; // Optional property for prove ID
}

export interface ModalDetailsFilter {
  year: DataDropdown;
  month: DataDropdown;
  oficial: RadioGroupOption;
}
