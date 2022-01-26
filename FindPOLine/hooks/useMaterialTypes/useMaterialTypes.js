import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { LIMIT_MAX, MATERIAL_TYPE_API } from '@folio/stripes-acq-components';

export const useMaterialTypes = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'material-types' });

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const { isLoading, data = {} } = useQuery(
    [namespace],
    () => ky.get(MATERIAL_TYPE_API, { searchParams }).json(),
  );

  return ({
    materialTypes: data.mtypes || [],
    isLoading,
  });
};
