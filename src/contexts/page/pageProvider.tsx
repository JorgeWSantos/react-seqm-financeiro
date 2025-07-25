import { useCallback, useState } from 'react';
import { PageContext } from './pageContext';
import type { PageContextObject } from './types';

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageContextObject>({
    page_title: '',
    path: '',
  });

  const goBack = useCallback(() => {}, []);

  const setPage = useCallback((page: PageContextObject) => {
    setCurrentPage(() => {
      return page;
    });
  }, []);

  return (
    <PageContext.Provider
      value={{
        goBack,
        currentPage,
        setPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
