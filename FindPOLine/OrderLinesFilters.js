import React from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';
import {
  AcqCheckboxFilter,
  AcqTagsFilter,
  LocationFilterContainer,
  SourceFilter,
  PluggableOrganizationFilter,
  AcqDateRangeFilter,
  BooleanFilter,
} from '@folio/stripes-acq-components';

import MaterialTypeFilter from './MaterialTypeFilter';
import OrdersTextFilter from './OrdersTextFilter';
import FundFilter from './FundFilter';
import {
  FILTERS,
  ACQUISITION_METHOD_FILTER_OPTIONS,
  ORDER_FORMAT_FILTER_OPTIONS,
  PAYMENT_STATUS_FILTER_OPTIONS,
  RECEIPT_STATUS_FILTER_OPTIONS,
} from './constants';

function OrderLinesFilters({ activeFilters, onChange, funds, materialTypes }) {
  return (
    <AccordionSet>
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.RECEIPT_STATUS]}
        closedByDefault={false}
        id={FILTERS.RECEIPT_STATUS}
        labelId="ui-orders.poLine.receiptStatus"
        name={FILTERS.RECEIPT_STATUS}
        onChange={onChange}
        options={RECEIPT_STATUS_FILTER_OPTIONS}
      />
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.PAYMENT_STATUS]}
        closedByDefault={false}
        id={FILTERS.PAYMENT_STATUS}
        labelId="ui-orders.poLine.paymentStatus"
        name={FILTERS.PAYMENT_STATUS}
        onChange={onChange}
        options={PAYMENT_STATUS_FILTER_OPTIONS}
      />
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.ACQUISITION_METHOD]}
        id={FILTERS.ACQUISITION_METHOD}
        labelId="ui-orders.poLine.acquisitionMethod"
        name={FILTERS.ACQUISITION_METHOD}
        onChange={onChange}
        options={ACQUISITION_METHOD_FILTER_OPTIONS}
      />
      <LocationFilterContainer
        id="pol-location-filter"
        activeFilter={activeFilters[FILTERS.LOCATION] && activeFilters[FILTERS.LOCATION][0]}
        labelId="ui-orders.line.accordion.location"
        name={FILTERS.LOCATION}
        onChange={onChange}
      />
      <FundFilter
        activeFilters={activeFilters[FILTERS.FUND_CODE]}
        id={FILTERS.FUND_CODE}
        labelId="ui-orders.filter.fundCode"
        name={FILTERS.FUND_CODE}
        onChange={onChange}
        funds={funds}
      />
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.ORDER_FORMAT]}
        id={FILTERS.ORDER_FORMAT}
        labelId="ui-orders.poLine.orderFormat"
        name={FILTERS.ORDER_FORMAT}
        onChange={onChange}
        options={ORDER_FORMAT_FILTER_OPTIONS}
      />
      <MaterialTypeFilter
        activeFilters={activeFilters[FILTERS.MATERIAL_TYPE_ELECTRONIC]}
        id={FILTERS.MATERIAL_TYPE_ELECTRONIC}
        isElectronic
        name={FILTERS.MATERIAL_TYPE_ELECTRONIC}
        onChange={onChange}
        materialTypes={materialTypes}
      />
      <MaterialTypeFilter
        activeFilters={activeFilters[FILTERS.MATERIAL_TYPE_PHYSICAL]}
        id={FILTERS.MATERIAL_TYPE_PHYSICAL}
        name={FILTERS.MATERIAL_TYPE_PHYSICAL}
        onChange={onChange}
        materialTypes={materialTypes}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.DATE_CREATED]}
        id={FILTERS.DATE_CREATED}
        labelId="ui-orders.poLine.dateCreated"
        name={FILTERS.DATE_CREATED}
        onChange={onChange}
      />
      <PluggableOrganizationFilter
        id={FILTERS.VENDOR}
        activeFilters={activeFilters[FILTERS.VENDOR]}
        labelId="ui-orders.line.accordion.vendor"
        name={FILTERS.VENDOR}
        onChange={onChange}
      />
      <AcqTagsFilter
        activeFilters={activeFilters[FILTERS.TAGS]}
        id={FILTERS.TAGS}
        name={FILTERS.TAGS}
        onChange={onChange}
      />
      <SourceFilter
        activeFilters={activeFilters[FILTERS.SOURCE_CODE]}
        id={FILTERS.SOURCE_CODE}
        name={FILTERS.SOURCE_CODE}
        onChange={onChange}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.COLLECTION]}
        id={FILTERS.COLLECTION}
        labelId="ui-orders.filter.collection"
        name={FILTERS.COLLECTION}
        onChange={onChange}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.RUSH]}
        id={FILTERS.RUSH}
        labelId="ui-orders.filter.rush"
        name={FILTERS.RUSH}
        onChange={onChange}
      />
      <PluggableOrganizationFilter
        id={FILTERS.ACCESS_PROVIDER}
        activeFilters={activeFilters[FILTERS.ACCESS_PROVIDER]}
        labelId="ui-orders.eresource.accessProvider"
        name={FILTERS.ACCESS_PROVIDER}
        onChange={onChange}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.ACTIVATED]}
        id={FILTERS.ACTIVATED}
        labelId="ui-orders.filter.activated"
        name={FILTERS.ACTIVATED}
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.EXPECTED_ACTIVATION_DATE]}
        id={FILTERS.EXPECTED_ACTIVATION_DATE}
        labelId="ui-orders.eresource.expectedActivation"
        name={FILTERS.EXPECTED_ACTIVATION_DATE}
        onChange={onChange}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.TRIAL]}
        id={FILTERS.TRIAL}
        labelId="ui-orders.filter.trial"
        name={FILTERS.TRIAL}
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.SUBSCRIPTION_FROM]}
        id={FILTERS.SUBSCRIPTION_FROM}
        labelId="ui-orders.itemDetails.subscriptionFrom"
        name={FILTERS.SUBSCRIPTION_FROM}
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.SUBSCRIPTION_TO]}
        id={FILTERS.SUBSCRIPTION_TO}
        labelId="ui-orders.itemDetails.subscriptionTo"
        name={FILTERS.SUBSCRIPTION_TO}
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.ACTUAL_RECEIPT_DATE]}
        id={FILTERS.ACTUAL_RECEIPT_DATE}
        labelId="ui-orders.filter.actualReceiptDate"
        name={FILTERS.ACTUAL_RECEIPT_DATE}
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.EXPECTED_RECEIPT_DATE]}
        id={FILTERS.EXPECTED_RECEIPT_DATE}
        labelId="ui-orders.physical.expectedReceiptDate"
        name={FILTERS.EXPECTED_RECEIPT_DATE}
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.RECEIPT_DUE]}
        id={FILTERS.RECEIPT_DUE}
        labelId="ui-orders.physical.receiptDue"
        name={FILTERS.RECEIPT_DUE}
        onChange={onChange}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.CLAIM]}
        id={FILTERS.CLAIM}
        labelId="ui-orders.filter.claim"
        name={FILTERS.CLAIM}
        onChange={onChange}
      />
      <OrdersTextFilter
        id={FILTERS.CLAIM_GRACE}
        activeFilters={activeFilters[FILTERS.CLAIM_GRACE]}
        labelId="ui-orders.filter.claimGrace"
        name={FILTERS.CLAIM_GRACE}
        type="number"
        onChange={onChange}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.CLAIM_SENT]}
        id={FILTERS.CLAIM_SENT}
        labelId="ui-orders.filter.claimSent"
        name={FILTERS.CLAIM_SENT}
        onChange={onChange}
      />
    </AccordionSet>
  );
}

OrderLinesFilters.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeFilters: PropTypes.object.isRequired,
  funds: PropTypes.arrayOf(PropTypes.object),
  materialTypes: PropTypes.arrayOf(PropTypes.object),
};

export default OrderLinesFilters;
