import React from 'react';
import PropTypes from 'prop-types';

import { SelectionFilter } from '@folio/stripes-acq-components';

const getFundOptions = (funds = []) => funds.map(fund => ({
  value: fund.id,
  label: fund.code,
}));

const FundFilter = ({ funds, ...rest }) => {
  const options = getFundOptions(funds);

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
};

FundFilter.propTypes = {
  funds: PropTypes.arrayOf(PropTypes.object),
};

export default FundFilter;
