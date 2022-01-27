import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { LIMIT_MAX, FUNDS_API } from '@folio/stripes-acq-components';

export const useFunds = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'funds' });

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const { isLoading, data = {} } = useQuery(
    [namespace],
    () => ky.get(FUNDS_API, { searchParams }).json(),
  );

  return ({
    funds: data.funds || [],
    isLoading,
  });
};
