'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

type RootProviderProps = { children: ReactNode };

const queryClient = new QueryClient();

const RootProvider = (props: RootProviderProps) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default RootProvider;
