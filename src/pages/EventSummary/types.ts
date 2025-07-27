import type { DataDropdown, RadioGroupOption } from '@abqm-ds/react';

export interface TableEventSummaryData {
  modality: string;
  organizator: string;
  judge: string;
  ABQM: string;
  inscriptions: string;
}

export interface ModalDetailsFilter {
  year: DataDropdown;
  month: DataDropdown;
  oficial: RadioGroupOption;
}
