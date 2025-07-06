import { useCallback, useState } from 'react';
import { PageContext } from './pageContext';
import type { PageContextObject } from './types';

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageContextObject>({ page_title: '' });
  const [previousPage, setPreviousPage] = useState<PageContextObject>({ page_title: '' });

  const goBack = useCallback(() => {
    const _previousPage = previousPage;
    setPreviousPage(currentPage);
    setCurrentPage(_previousPage);
  }, [previousPage, currentPage]);

  const setPage = useCallback((page: PageContextObject) => {
    // setPreviousPage(currentPage);
    setCurrentPage((current) => {
      setPreviousPage(current);
      return page;
    });
  }, []);

  return (
    <PageContext.Provider
      value={{
        goBack,
        currentPage,
        setPage,
        previousPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
