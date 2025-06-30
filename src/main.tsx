// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { GlobalStyle } from './styles/global.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@contexts/auth/authProvider.tsx';
import { AppRoutes } from './routes/index.tsx';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary, ToastRoot } from '@abqm-ds/react';
import { TokenLoginHandler } from './token-login-handler';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <GlobalStyle />
    <ErrorBoundary>
      <ToastRoot />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <TokenLoginHandler />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </>
  // </StrictMode>
);
