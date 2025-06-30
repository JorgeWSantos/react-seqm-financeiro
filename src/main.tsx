// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from '.';
import { GlobalStyle } from './styles/global';
import { ErrorBoundary, ToastRoot } from '@abqm-ds/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/authProvider';
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
          <TokenLoginHandler />
          <MainApp />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </>
  // </StrictMode>
);
