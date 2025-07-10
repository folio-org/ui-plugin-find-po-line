import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { useSuffixes } from '../hooks';
import { useIntl } from 'react-intl';
import { getPrefixSuffixOptions } from '../utils';

const SuffixFilter = ({ tenantId, ...rest }) => {
  const { suffixes } = useSuffixes({ tenantId });
  const intl = useIntl();

  const deprecatedText = intl.formatMessage({
    id: "ui-plugin-find-po-line.filter.suffixFilter.deprecated",
  });

  const options = getPrefixSuffixOptions(suffixes, deprecatedText);

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
