import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { usePrefixes } from '../hooks';

function PrefixFilter({ tenantId, ...rest }) {
  const { prefixes } = usePrefixes({ tenantId });

  const options = useMemo(() => prefixes.map(({ name }) => ({ label: name, value: name })), [prefixes]);

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
}

PrefixFilter.propTypes = {
  tenantId: PropTypes.string,
};

export default PrefixFilter;
