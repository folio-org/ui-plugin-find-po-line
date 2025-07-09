import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { usePrefixes } from '../hooks';
import { useIntl } from 'react-intl';

function PrefixFilter({ tenantId, ...rest }) {
  const { prefixes } = usePrefixes({ tenantId });
  const intl = useIntl();

  const deprecatedText = intl.formatMessage({
    id: "ui-plugin-find-po-line.filter.prefixFilter.deprecated",
  });

  const options = useMemo(
    () =>
      prefixes.map(({ name, deprecated }) => ({
        label: deprecated ? `${name} (${deprecatedText})` : name,
        value: name,
      })),
    [prefixes],
  );

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
