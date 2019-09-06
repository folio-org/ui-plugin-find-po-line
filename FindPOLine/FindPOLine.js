import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  PluginFindRecord,
  PluginFindRecordModal,
} from '@folio/stripes-acq-components';

import FindPOLineContainer from './FindPOLineContainer';

const FindPOLine = ({ addLines, isSingleSelect, ...rest }) => (
  <PluginFindRecord
    {...rest}
    selectRecordsCb={addLines}
  >
    {(modalProps) => (
      <FindPOLineContainer>
        {(viewProps) => (
          <PluginFindRecordModal
            {...viewProps}
            {...modalProps}
            isMultiSelect={!isSingleSelect}
          />
        )}
      </FindPOLineContainer>
    )}
  </PluginFindRecord>
);

FindPOLine.propTypes = {
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  stripes: PropTypes.object,
  dataKey: PropTypes.string.isRequired,
  addLines: PropTypes.func.isRequired,
  isSingleSelect: PropTypes.bool,
};

FindPOLine.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-po-line.addPOLine" />,
  isSingleSelect: false,
};

export default FindPOLine;
