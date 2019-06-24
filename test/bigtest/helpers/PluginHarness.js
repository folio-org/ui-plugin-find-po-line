import React from 'react';
import noop from 'lodash/noop';
import { Pluggable, withStripes } from '@folio/stripes/core';

class PluginHarness extends React.Component {
  render() {
    return (
      <Pluggable
        aria-haspopup="true"
        type="find-po-line"
        id="clickable-find-po-line"
        searchLabel="Look up po lines"
        marginTop0
        searchButtonStyle="link"
        dataKey="poLinesTest"
        addInterfaces={noop}
        {...this.props}
      >
        <span data-test-no-plugin-available>No plugin available!</span>
      </Pluggable>
    );
  }
}

export default withStripes(PluginHarness);
