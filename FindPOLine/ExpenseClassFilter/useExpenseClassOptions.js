import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { EXPENSE_CLASSES_API } from '@folio/stripes-acq-components';

export const useExpenseClassOptions = () => {
  const ky = useOkapiKy();

  const { data } = useQuery(
    [EXPENSE_CLASSES_API, 'expenseClassOptions'],
    () => ky.get(`${EXPENSE_CLASSES_API}`, { searchParams: { query: 'cql.allRecords=1 sortby name' } }).json(),
  );

  return data?.expenseClasses?.map(({ id, name }) => ({ value: id, label: name })) || [];
};
