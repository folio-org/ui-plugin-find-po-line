import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  useOkapiKy,
} from '@folio/stripes/core';
import {
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import { useFetchOrderLines } from './useFetchOrderLines';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
  useStripes: () => ({ timezone: 'UTC' }),
}));

const poLine = { id: 'poLineId' };

const getMock = jest.fn().mockReturnValue({
  json: () => ({ poLines: [poLine], totalRecords: 1 }),
});

describe('useFetchOrderLines', () => {
  beforeEach(() => {
    getMock.mockClear();

    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: getMock,
      });
  });

  it('should not make a get a request to fetch poLines when fetchOrderLines is called and without filters', async () => {
    const { result } = renderHook(() => useFetchOrderLines());

    await result.current.fetchOrderLines({ searchParams: {}, offset: 15 });

    expect(getMock).not.toHaveBeenCalled();
  });

  it('should make a get a request to fetch poLines when fetchOrderLines is called and with filters', async () => {
    const { result } = renderHook(() => useFetchOrderLines());

    await result.current.fetchOrderLines({ searchParams: { receiptStatus: ['pending'] }, offset: 15 });

    expect(getMock).toHaveBeenCalledWith(
      'orders/order-lines',
      {
        searchParams: {
          limit: PLUGIN_RESULT_COUNT_INCREMENT,
          offset: 15,
          query: '(receiptStatus==("pending")) sortby metadata.updatedDate/sort.descending',
        },
      },
    );
  });
});
