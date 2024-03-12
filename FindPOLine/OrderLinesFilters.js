import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
} from '@folio/stripes/components';
import {
  AcqCheckboxFilter,
  AcqTagsFilter,
  AcqUnitFilter,
  LocationFilterContainer,
  SourceFilter,
  ORDER_FORMAT_OPTIONS,
  PluggableOrganizationFilter,
  AcqDateRangeFilter,
  BooleanFilter,
  FundFilter,
  ExpenseClassFilter,
  PluggableDonorsFilter,
} from '@folio/stripes-acq-components';

import AcqMethodsFilter from './AcqMethodsFilter';
import MaterialTypeFilter from './MaterialTypeFilter';
// import OrdersTextFilter from './OrdersTextFilter';
import PrefixFilter from './PrefixFilter';
import SuffixFilter from './SuffixFilter';
import {
  FILTERS,
  PAYMENT_STATUS_FILTER_OPTIONS,
  RECEIPT_STATUS_FILTER_OPTIONS,
} from './constants';
import { LinkedPackagePOLineFilter } from './LinkedPackagePOLineFilter';
import { getDateRangeValueAsString } from './utils';

const applyFiltersAdapter = (applyFilters) => ({ name, values }) => applyFilters(name, values);

export function OrderLinesFilters({ activeFilters, applyFilters, disabled, funds = [], materialTypes = [] }) {
  const adaptedApplyFilters = useCallback(
    applyFiltersAdapter(applyFilters),
    [applyFilters],
  );

  const handleDateRangeFilter = useCallback(({ name, values }) => {
    const valueAsString = getDateRangeValueAsString(values);

    return adaptedApplyFilters({ name, values: valueAsString });
  }, [adaptedApplyFilters]);

  const getActiveDateRangeFilters = useCallback((filterName) => {
    const filterValue = activeFilters[filterName];

    return filterValue ? [filterValue] : '';
  }, [activeFilters]);

  return (
    <AccordionSet>
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.RECEIPT_STATUS]}
        closedByDefault={false}
        disabled={disabled}
        id={FILTERS.RECEIPT_STATUS}
        labelId="ui-orders.poLine.receiptStatus"
        name={FILTERS.RECEIPT_STATUS}
        onChange={adaptedApplyFilters}
        options={RECEIPT_STATUS_FILTER_OPTIONS}
      />
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.PAYMENT_STATUS]}
        closedByDefault={false}
        disabled={disabled}
        id={FILTERS.PAYMENT_STATUS}
        labelId="ui-orders.poLine.paymentStatus"
        name={FILTERS.PAYMENT_STATUS}
        onChange={adaptedApplyFilters}
        options={PAYMENT_STATUS_FILTER_OPTIONS}
      />
      <PrefixFilter
        id={FILTERS.PREFIX}
        activeFilters={activeFilters[FILTERS.PREFIX]}
        labelId="ui-orders.orderDetails.orderNumberPrefix"
        name={FILTERS.PREFIX}
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />
      <SuffixFilter
        id={FILTERS.SUFFIX}
        activeFilters={activeFilters[FILTERS.SUFFIX]}
        labelId="ui-orders.orderDetails.orderNumberSuffix"
        name={FILTERS.SUFFIX}
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />
      <AcqUnitFilter
        id={FILTERS.ACQUISITIONS_UNIT}
        activeFilters={activeFilters[FILTERS.ACQUISITIONS_UNIT]}
        name={FILTERS.ACQUISITIONS_UNIT}
        onChange={adaptedApplyFilters}
        disabled={disabled}
      />
      <AcqMethodsFilter
        activeFilters={activeFilters[FILTERS.ACQUISITION_METHOD]}
        disabled={disabled}
        id={FILTERS.ACQUISITION_METHOD}
        labelId="ui-orders.poLine.acquisitionMethod"
        name={FILTERS.ACQUISITION_METHOD}
        onChange={adaptedApplyFilters}
      />
      <LocationFilterContainer
        id="pol-location-filter"
        activeFilter={activeFilters[FILTERS.LOCATION] && activeFilters[FILTERS.LOCATION][0]}
        disabled={disabled}
        labelId="ui-orders.line.accordion.location"
        name={FILTERS.LOCATION}
        onChange={adaptedApplyFilters}
      />
      <FundFilter
        activeFilters={activeFilters[FILTERS.FUND_CODE]}
        disabled={disabled}
        id={FILTERS.FUND_CODE}
        name={FILTERS.FUND_CODE}
        onChange={adaptedApplyFilters}
        funds={funds}
      />
      <ExpenseClassFilter
        activeFilters={activeFilters[FILTERS.EXPENSE_CLASS]}
        disabled={disabled}
        id={FILTERS.EXPENSE_CLASS}
        name={FILTERS.EXPENSE_CLASS}
        onChange={adaptedApplyFilters}
      />
      <LinkedPackagePOLineFilter
        id={FILTERS.PACKAGE_PO_LINE}
        activeFilters={activeFilters[FILTERS.PACKAGE_PO_LINE]}
        disabled={disabled}
        labelId="ui-plugin-find-po-line.filter.linkedPackagePOLine.accordion.label"
        name={FILTERS.PACKAGE_PO_LINE}
        onChange={adaptedApplyFilters}
      />
      <AcqCheckboxFilter
        activeFilters={activeFilters[FILTERS.ORDER_FORMAT]}
        disabled={disabled}
        id={FILTERS.ORDER_FORMAT}
        labelId="ui-orders.poLine.orderFormat"
        name={FILTERS.ORDER_FORMAT}
        onChange={adaptedApplyFilters}
        options={ORDER_FORMAT_OPTIONS}
      />
      <MaterialTypeFilter
        activeFilters={activeFilters[FILTERS.MATERIAL_TYPE_ELECTRONIC]}
        disabled={disabled}
        id={FILTERS.MATERIAL_TYPE_ELECTRONIC}
        isElectronic
        name={FILTERS.MATERIAL_TYPE_ELECTRONIC}
        onChange={adaptedApplyFilters}
        materialTypes={materialTypes}
      />
      <MaterialTypeFilter
        activeFilters={activeFilters[FILTERS.MATERIAL_TYPE_PHYSICAL]}
        disabled={disabled}
        id={FILTERS.MATERIAL_TYPE_PHYSICAL}
        name={FILTERS.MATERIAL_TYPE_PHYSICAL}
        onChange={adaptedApplyFilters}
        materialTypes={materialTypes}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.DATE_CREATED)}
        disabled={disabled}
        id={FILTERS.DATE_CREATED}
        labelId="ui-orders.poLine.dateCreated"
        name={FILTERS.DATE_CREATED}
        onChange={handleDateRangeFilter}
      />
      <PluggableDonorsFilter
        id={FILTERS.DONOR}
        activeFilters={activeFilters[FILTERS.DONOR]}
        disabled={disabled}
        labelId="ui-orders.line.accordion.donor"
        name={FILTERS.DONOR}
        onChange={adaptedApplyFilters}
      />
      <PluggableOrganizationFilter
        id={FILTERS.VENDOR}
        activeFilters={activeFilters[FILTERS.VENDOR]}
        disabled={disabled}
        labelId="ui-orders.line.accordion.vendor"
        name={FILTERS.VENDOR}
        onChange={adaptedApplyFilters}
      />
      <AcqTagsFilter
        activeFilters={activeFilters[FILTERS.TAGS]}
        disabled={disabled}
        id={FILTERS.TAGS}
        name={FILTERS.TAGS}
        onChange={adaptedApplyFilters}
      />
      <SourceFilter
        activeFilters={activeFilters[FILTERS.SOURCE_CODE]}
        disabled={disabled}
        id={FILTERS.SOURCE_CODE}
        name={FILTERS.SOURCE_CODE}
        onChange={adaptedApplyFilters}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.COLLECTION]}
        disabled={disabled}
        id={FILTERS.COLLECTION}
        labelId="ui-orders.filter.collection"
        name={FILTERS.COLLECTION}
        onChange={adaptedApplyFilters}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.RUSH]}
        disabled={disabled}
        id={FILTERS.RUSH}
        labelId="ui-orders.filter.rush"
        name={FILTERS.RUSH}
        onChange={adaptedApplyFilters}
      />
      <PluggableOrganizationFilter
        id={FILTERS.ACCESS_PROVIDER}
        activeFilters={activeFilters[FILTERS.ACCESS_PROVIDER]}
        disabled={disabled}
        labelId="ui-orders.eresource.accessProvider"
        name={FILTERS.ACCESS_PROVIDER}
        onChange={adaptedApplyFilters}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.ACTIVATED]}
        disabled={disabled}
        id={FILTERS.ACTIVATED}
        labelId="ui-orders.filter.activated"
        name={FILTERS.ACTIVATED}
        onChange={adaptedApplyFilters}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.EXPECTED_ACTIVATION_DATE)}
        disabled={disabled}
        id={FILTERS.EXPECTED_ACTIVATION_DATE}
        labelId="ui-orders.eresource.expectedActivation"
        name={FILTERS.EXPECTED_ACTIVATION_DATE}
        onChange={handleDateRangeFilter}
      />
      <BooleanFilter
        activeFilters={activeFilters[FILTERS.TRIAL]}
        disabled={disabled}
        id={FILTERS.TRIAL}
        labelId="ui-orders.filter.trial"
        name={FILTERS.TRIAL}
        onChange={adaptedApplyFilters}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.SUBSCRIPTION_FROM)}
        disabled={disabled}
        id={FILTERS.SUBSCRIPTION_FROM}
        labelId="ui-orders.itemDetails.subscriptionFrom"
        name={FILTERS.SUBSCRIPTION_FROM}
        onChange={handleDateRangeFilter}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.SUBSCRIPTION_TO)}
        disabled={disabled}
        id={FILTERS.SUBSCRIPTION_TO}
        labelId="ui-orders.itemDetails.subscriptionTo"
        name={FILTERS.SUBSCRIPTION_TO}
        onChange={handleDateRangeFilter}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.ACTUAL_RECEIPT_DATE)}
        disabled={disabled}
        id={FILTERS.ACTUAL_RECEIPT_DATE}
        labelId="ui-orders.filter.actualReceiptDate"
        name={FILTERS.ACTUAL_RECEIPT_DATE}
        onChange={handleDateRangeFilter}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.EXPECTED_RECEIPT_DATE)}
        disabled={disabled}
        id={FILTERS.EXPECTED_RECEIPT_DATE}
        labelId="ui-orders.physical.expectedReceiptDate"
        name={FILTERS.EXPECTED_RECEIPT_DATE}
        onChange={handleDateRangeFilter}
      />
      <AcqDateRangeFilter
        activeFilters={getActiveDateRangeFilters(FILTERS.RECEIPT_DUE)}
        disabled={disabled}
        id={FILTERS.RECEIPT_DUE}
        labelId="ui-orders.physical.receiptDue"
        name={FILTERS.RECEIPT_DUE}
        onChange={handleDateRangeFilter}
      />
      <AcqDateRangeFilter
        id={FILTERS.EXPORT_DATE}
        activeFilters={getActiveDateRangeFilters(FILTERS.EXPORT_DATE)}
        labelId="ui-orders.export.exportDate"
        name={FILTERS.EXPORT_DATE}
        onChange={handleDateRangeFilter}
        disabled={disabled}
      />
      {/* <BooleanFilter
        activeFilters={activeFilters[FILTERS.CLAIM]}
        disabled={disabled}
        id={FILTERS.CLAIM}
        labelId="ui-orders.filter.claim"
        name={FILTERS.CLAIM}
        onChange={adaptedApplyFilters}
      />
      <OrdersTextFilter
        id={FILTERS.CLAIM_GRACE}
        activeFilters={activeFilters[FILTERS.CLAIM_GRACE]}
        disabled={disabled}
        labelId="ui-orders.filter.claimGrace"
        name={FILTERS.CLAIM_GRACE}
        type="number"
        onChange={adaptedApplyFilters}
      />
      <AcqDateRangeFilter
        activeFilters={activeFilters[FILTERS.CLAIM_SENT]}
        disabled={disabled}
        id={FILTERS.CLAIM_SENT}
        labelId="ui-orders.filter.claimSent"
        name={FILTERS.CLAIM_SENT}
        onChange={adaptedApplyFilters}
      /> */}
    </AccordionSet>
  );
}

OrderLinesFilters.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  activeFilters: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  funds: PropTypes.arrayOf(PropTypes.object),
  materialTypes: PropTypes.arrayOf(PropTypes.object),
};

OrderLinesFilters.defaultProps = {
  disabled: false,
};
