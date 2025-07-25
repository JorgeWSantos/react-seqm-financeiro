import type { DataDropdown, RadioGroupOption } from '@abqm-ds/react';

export interface TableEventSummaryData {
  category: string;
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
