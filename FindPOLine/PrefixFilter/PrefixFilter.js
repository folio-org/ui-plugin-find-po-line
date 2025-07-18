import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { usePrefixes } from '../hooks';
import { getPrefixSuffixOptions } from '../utils';

function PrefixFilter({ tenantId, ...rest }) {
  const { prefixes } = usePrefixes({ tenantId });
  const intl = useIntl();
  const options = getPrefixSuffixOptions(prefixes, intl);

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
