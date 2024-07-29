import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { useSuffixes } from '../hooks';

const SuffixFilter = ({ tenantId, ...rest }) => {
  const { suffixes } = useSuffixes({ tenantId });

  const options = useMemo(() => suffixes.map(({ name }) => ({ label: name, value: name })), [suffixes]);

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
};

SuffixFilter.propTypes = {
  tenantId: PropTypes.string,
};

export default SuffixFilter;
