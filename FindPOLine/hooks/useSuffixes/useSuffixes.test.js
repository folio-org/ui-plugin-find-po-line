import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useSuffixes } from './useSuffixes';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const suffix = { id: '001', name: 'suf' };

describe('useSuffixes', () => {
  it('should return suffix records', async () => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => ({
            suffixes: [suffix],
          }),
        }),
      });

    const { result } = renderHook(() => useSuffixes(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.suffixes).toEqual([suffix]);
  });
});
