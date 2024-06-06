import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 3 * (60 * 1000),
      retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 30000),
      retry: 2,
    },
  },
});

type QueryProviderProp = {
  children: React.ReactNode;
};

export const QueryProvider: React.FC<QueryProviderProp> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools position="bottom-left" />
  </QueryClientProvider>
);
