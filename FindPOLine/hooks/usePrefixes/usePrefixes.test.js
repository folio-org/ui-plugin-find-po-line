import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { usePrefixes } from './usePrefixes';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const prefix = { id: '001', name: 'pref' };

describe('usePrefixes', () => {
  it('should return prefix records', async () => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => ({
            prefixes: [prefix],
          }),
        }),
      });

    const { result } = renderHook(() => usePrefixes(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.prefixes).toEqual([prefix]);
  });
});
