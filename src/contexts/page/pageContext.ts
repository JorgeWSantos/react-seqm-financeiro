import { createContext } from 'react';
import type { PageContextObject } from './types';

export interface PageContextType {
  goBack: () => void;
  currentPage: PageContextObject;
  previousPage: PageContextObject;
  setPage: (page: PageContextObject) => void;
}

export const PageContext = createContext<PageContextType>({} as PageContextType);
