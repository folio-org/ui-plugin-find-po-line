import { useCallback } from 'react';

import { useOkapiKy } from '@folio/stripes/core';
import {
  LINES_API,
  getFiltersCount,
} from '@folio/stripes-acq-components';

import {
  getLinesQuery,
} from '../../utils';

export const useFetchOrderLines = () => {
  const ky = useOkapiKy();

  const fetchOrderLines = useCallback(async ({
    searchParams = {},
    offset = 0,
  }) => {
    const buildLinesQuery = getLinesQuery(searchParams, ky);
    const filtersCount = getFiltersCount(searchParams);

    if (!filtersCount) {
      return { poLines: [], totalRecords: 0 };
    }

    const query = await buildLinesQuery();

    const builtSearchParams = {
      query,
      limit: 30,
      offset,
    };

    const { poLines, totalRecords } = await ky
      .get(LINES_API, { searchParams: { ...builtSearchParams } })
      .json();

    return {
      poLines,
      totalRecords,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchOrderLines };
};
