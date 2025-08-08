// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/global';
import { ErrorBoundary, ToastRoot } from '@abqm-ds/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/authProvider';
import { TokenLoginHandler } from './token-login-handler';
import { PageProvider } from './contexts/page/pageProvider';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { MenuProvider } from './contexts/menu/menuProvider';
import Layout from './Layout';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <GlobalStyle />
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <AuthProvider>
            <MenuProvider>
              <TokenLoginHandler />
              <Layout>
                <RouterProvider router={router} />
              </Layout>
              <ToastRoot />
            </MenuProvider>
          </AuthProvider>
        </PageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </>
  // </StrictMode>
);
