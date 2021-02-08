import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import {
  SelectionFilter,
  suffixesResource,
} from '@folio/stripes-acq-components';

function SuffixFilter({ resources, ...rest }) {
  const options = resources.suffixesSetting.records?.map(({ name }) => ({ label: name, value: name }));

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
}

SuffixFilter.manifest = Object.freeze({
  suffixesSetting: suffixesResource,
});

SuffixFilter.propTypes = {
  resources: PropTypes.object.isRequired,
};

export default stripesConnect(SuffixFilter);
