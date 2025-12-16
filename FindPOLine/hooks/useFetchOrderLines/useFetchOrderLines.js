import { useCallback } from 'react';

import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import {
  getFiltersCount,
  LINES_API,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import { getLinesQuery } from '../../utils';

export const useFetchOrderLines = (options = {}) => {
  const { tenantId } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const { timezone } = useStripes();

  const fetchOrderLines = useCallback(async ({
    searchParams = {},
    offset = 0,
    limit = PLUGIN_RESULT_COUNT_INCREMENT,
  }) => {
    const buildLinesQuery = getLinesQuery(searchParams, ky);
    const filtersCount = getFiltersCount(searchParams);

    if (!filtersCount) {
      return { poLines: [], totalRecords: 0 };
    }

    const query = await buildLinesQuery({ timezone });

    const builtSearchParams = {
      query,
      limit,
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
  }, [tenantId, timezone]);

  return { fetchOrderLines };
};
