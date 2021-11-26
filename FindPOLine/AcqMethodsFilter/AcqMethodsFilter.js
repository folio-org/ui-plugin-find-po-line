import React from 'react';
import PropTypes from 'prop-types';

import { MultiSelectionFilter } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';
import {
  FilterAccordion,
  acquisitionMethodsResource,
} from '@folio/stripes-acq-components';

const AcqMethodsFilter = ({
  activeFilters,
  closedByDefault,
  disabled,
  id,
  labelId,
  name,
  onChange,
  resources,
}) => {
  const options = resources.acquisitionMethods.records?.map(({ id: acqMethodId, value }) => (
    { label: value, value: acqMethodId }
  ));

  return (
    <FilterAccordion
      activeFilters={activeFilters}
      closedByDefault={closedByDefault}
      disabled={disabled}
      id={id}
      labelId={labelId}
      name={name}
      onChange={onChange}
    >
      <MultiSelectionFilter
        ariaLabelledBy={`accordion-toggle-button-${id}`}
        dataOptions={options}
        disabled={disabled}
        id="acq-methods-filter"
        name={name}
        onChange={onChange}
        selectedValues={activeFilters}
      />
    </FilterAccordion>
  );
};

AcqMethodsFilter.manifest = Object.freeze({
  acquisitionMethods: acquisitionMethodsResource,
});

AcqMethodsFilter.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  resources: PropTypes.object.isRequired,
};

AcqMethodsFilter.defaultProps = {
  closedByDefault: true,
  disabled: false,
};

export default stripesConnect(AcqMethodsFilter);
