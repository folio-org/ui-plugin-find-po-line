import React from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { useExpenseClassOptions } from './useExpenseClassOptions';

const ExpenseClassFilter = (props) => {
  const options = useExpenseClassOptions();

  return (
    <SelectionFilter
      {...props}
      options={options}
    />
  );
};

export default ExpenseClassFilter;
