import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { LINES_API } from '@folio/stripes-acq-components';

export const useOrderLine = (lineId) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'purchase-order-line' });

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery(
    [namespace, lineId],
    () => ky.get(`${LINES_API}/${lineId}`).json(),
    {
      enabled: Boolean(lineId),
    },
  );

  return ({
    orderLine: data,
    isFetching,
    isLoading,
  });
};
