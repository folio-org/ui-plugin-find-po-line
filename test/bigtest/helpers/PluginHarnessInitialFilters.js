import React from 'react';
import noop from 'lodash/noop';

import { Pluggable } from '@folio/stripes/core';

const PluginHarnessSingleSelect = (props) => (
  <Pluggable
    aria-haspopup="true"
    type="find-po-line"
    id="clickable-find-po-line"
    searchLabel="Look up po lines"
    marginTop0
    searchButtonStyle="link"
    addLines={noop}
    isSingleSelect
    filters="receiptStatus.Awaiting Receipt"
    initialFilterState={{ receiptStatus: ['Awaiting Receipt'] }}
    {...props}
  >
    <span data-test-no-plugin-available>No plugin available!</span>
  </Pluggable>
);

export default PluginHarnessSingleSelect;
