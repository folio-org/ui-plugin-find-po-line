import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  LIMIT_MAX,
  MATERIAL_TYPE_API,
} from '@folio/stripes-acq-components';

export const useMaterialTypes = (options = {}) => {
  const {
    tenantId,
    ...queryOptions
  } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'material-types' });

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const { isLoading, data = {} } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: ({ signal }) => ky.get(MATERIAL_TYPE_API, { searchParams, signal }).json(),
    ...queryOptions,
  });

  return ({
    materialTypes: data.mtypes || [],
    isLoading,
  });
};
