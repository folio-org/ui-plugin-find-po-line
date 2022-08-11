import { useCallback } from 'react';
import moment from 'moment';

import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import {
  LINES_API,
  getFiltersCount,
  PLUGIN_RESULT_COUNT_INCREMENT,
} from '@folio/stripes-acq-components';

import {
  getLinesQuery,
} from '../../utils';

export const useFetchOrderLines = () => {
  const ky = useOkapiKy();
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

    moment.tz.setDefault(timezone);

    const query = await buildLinesQuery();

    moment.tz.setDefault();

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
  }, []);

  return { fetchOrderLines };
};
