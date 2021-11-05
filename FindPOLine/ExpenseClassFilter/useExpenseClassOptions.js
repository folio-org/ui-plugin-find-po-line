import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { EXPENSE_CLASSES_API, LIMIT_MAX } from '@folio/stripes-acq-components';

export const useExpenseClassOptions = () => {
  const ky = useOkapiKy();

  const searchParams = {
    limit: LIMIT_MAX,
    query: 'cql.allRecords=1 sortby name',
  };

  const { data } = useQuery(
    [EXPENSE_CLASSES_API, 'expenseClassOptions'],
    () => ky.get(`${EXPENSE_CLASSES_API}`, { searchParams }).json(),
  );

  return data?.expenseClasses?.map(({ id, name }) => ({ value: id, label: name })) || [];
};
