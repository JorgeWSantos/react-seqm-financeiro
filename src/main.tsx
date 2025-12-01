// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/global';
import { ErrorBoundary, ToastRoot } from '@abqm-ds/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/authProvider';
import { PageProvider } from './contexts/page/pageProvider';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { MenuProvider } from './contexts/menu/menuProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <AuthProvider>
            <MenuProvider>
              <RouterProvider router={router} />
              <ToastRoot />
            </MenuProvider>
          </AuthProvider>
        </PageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </>
);
