import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Pluggable } from '@folio/stripes/core';
import { AccordionStatus } from '@folio/stripes/components';
import {
  FilterAccordion,
  TextField,
} from '@folio/stripes-acq-components';

import { useOrderLine } from '../hooks';

export const LinkedPackagePOLineFilter = ({
  id,
  activeFilters,
  closedByDefault,
  disabled,
  labelId,
  name,
  onChange,
}) => {
  const intl = useIntl();
  const label = intl.formatMessage({ id: labelId });

  const {
    isFetching,
    orderLine,
  } = useOrderLine(activeFilters?.[0]);

  const onSelectLine = useCallback(([{ id: poLineId }]) => {
    onChange({ name, values: [poLineId] });
  }, [name, onChange]);

  return (
    <FilterAccordion
      id={id}
      activeFilters={activeFilters}
      closedByDefault={closedByDefault}
      disabled={disabled}
      labelId={labelId}
      name={name}
      onChange={onChange}
    >
      <TextField
        ariaLabel={label}
        loading={isFetching}
        marginBottom0
        type="text"
        value={(activeFilters?.[0] && orderLine?.poLineNumber) || ''}
        disabled
      />

      <AccordionStatus>
        <Pluggable
          aria-haspopup="true"
          addLines={onSelectLine}
          id={`${id}-trigger`}
          initialFilters={{ isPackage: ['true'] }}
          isSingleSelect
          type="find-po-line"
          searchButtonStyle="link"
          searchLabel={intl.formatMessage({ id: 'ui-plugin-find-po-line.filter.linkedPackagePOLine.lookup.label' })}
        >
          <FormattedMessage id="ui-orders.find-po-line-plugin-unavailable" />
        </Pluggable>
      </AccordionStatus>
    </FilterAccordion>
  );
};

LinkedPackagePOLineFilter.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labelId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

LinkedPackagePOLineFilter.defaultProps = {
  closedByDefault: true,
  disabled: false,
};
