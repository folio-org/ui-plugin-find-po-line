import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { useSuffixes } from '../hooks';
import { useIntl } from 'react-intl';
import { getPrefixSuffixOptions } from '../utils';

const SuffixFilter = ({ tenantId, ...rest }) => {
  const { suffixes } = useSuffixes({ tenantId });
  const intl = useIntl();

  const options = getPrefixSuffixOptions(suffixes, intl);

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
