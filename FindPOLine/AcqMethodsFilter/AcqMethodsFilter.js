import PropTypes from 'prop-types';

import { MultiSelectionFilter } from '@folio/stripes/smart-components';
import {
  FilterAccordion,
  useAcqMethodsOptions,
  useAcquisitionMethods,
} from '@folio/stripes-acq-components';

const AcqMethodsFilter = ({
  activeFilters,
  closedByDefault,
  disabled,
  id,
  labelId,
  name,
  onChange,
  tenantId,
}) => {
  const { acquisitionMethods } = useAcquisitionMethods({ tenantId });
  const options = useAcqMethodsOptions(acquisitionMethods);

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

AcqMethodsFilter.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
};

AcqMethodsFilter.defaultProps = {
  closedByDefault: true,
  disabled: false,
};

export default AcqMethodsFilter;
