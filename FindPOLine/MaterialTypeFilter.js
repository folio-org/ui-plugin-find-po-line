import React from 'react';
import PropTypes from 'prop-types';

import { SelectionFilter } from '@folio/stripes-acq-components';

const getMaterialTypesOptions = (materialTypes = []) => materialTypes.map(materialType => ({
  value: materialType.id,
  label: materialType.name,
}));

const MaterialTypeFilter = ({ isElectronic = false, materialTypes, ...rest }) => {
  const options = getMaterialTypesOptions(materialTypes);
  const labelId = isElectronic ? 'ui-orders.filter.materialType.electronic' : 'ui-orders.filter.materialType.physical';

  return (
    <SelectionFilter
      {...rest}
      labelId={labelId}
      options={options}
    />
  );
};

MaterialTypeFilter.propTypes = {
  isElectronic: PropTypes.bool,
  materialTypes: PropTypes.arrayOf(PropTypes.object),
};

export default MaterialTypeFilter;
