'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const CONFIGURATION = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

function makeQueryClient(): QueryClient {
  return new QueryClient(CONFIGURATION);
}

let browsetQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
  let res: QueryClient;
  if (isServer) {
    res = makeQueryClient();
  } else {
    if (!browsetQueryClient) {
      browsetQueryClient = makeQueryClient();
    }
    res = browsetQueryClient;
  }

  return res;
}

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
