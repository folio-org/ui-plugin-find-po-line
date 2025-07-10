import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { usePrefixes } from '../hooks';
import { useIntl } from 'react-intl';
import { getPrefixSuffixOptions } from '../utils';

function PrefixFilter({ tenantId, ...rest }) {
  const { prefixes } = usePrefixes({ tenantId });
  const intl = useIntl();

  const deprecatedText = intl.formatMessage({
    id: "ui-plugin-find-po-line.filter.prefixFilter.deprecated",
  });

  const options = getPrefixSuffixOptions(prefixes, deprecatedText);

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
