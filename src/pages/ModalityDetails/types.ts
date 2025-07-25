import type { DataDropdown, RadioGroupOption } from '@abqm-ds/react';

export interface ModalitiesEvents {
  event: string;
  organizator: string;
  local: string;
  init: string;
  end: string;
  isOficial?: boolean; // Optional property for AQHA-specific columns
}

export interface ModalDetailsFilter {
  year: DataDropdown;
  month: DataDropdown;
  oficial: RadioGroupOption;
}
