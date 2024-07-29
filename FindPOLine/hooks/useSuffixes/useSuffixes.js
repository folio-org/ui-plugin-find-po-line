import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  LIMIT_MAX,
  SUFFIXES_API,
} from '@folio/stripes-acq-components';

const DEFAULT_DATA = [];

export const useSuffixes = (options = {}) => {
  const {
    tenantId,
    ...queryOptions
  } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'order-suffixes' });

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: ({ signal }) => ky.get(SUFFIXES_API, { searchParams, signal }).json(),
    ...queryOptions,
  });

  return ({
    suffixes: data?.suffixes || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    isLoading,
  });
};
