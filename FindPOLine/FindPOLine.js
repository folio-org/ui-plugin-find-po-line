import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import { NoValue } from '@folio/stripes/components';
import {
  AmountWithCurrencyField,
  FindRecords,
  FolioFormattedDate,
} from '@folio/stripes-acq-components';

import { OrderLinesFilters } from './OrderLinesFilters';
import { searchableIndexes } from './OrderLinesSearchConfig';
import {
  useFetchOrderLines,
  useFunds,
  useMaterialTypes,
} from './hooks';

const RESULT_COUNT_INCREMENT = 30;

const idPrefix = 'uiPluginFindPOLine-';
const modalLabel = <FormattedMessage id="ui-plugin-find-po-line.modal.title" />;
const resultsPaneTitle = <FormattedMessage id="ui-orders.navigation.orderLines" />;

const columnWidths = {
  isChecked: '7%',
  poLineNumber: '11%',
  titleOrPackage: '32%',
  productIds: '18%',
  vendorRefNumber: '14%',
  funCodes: '18%',
};
const visibleColumns = ['poLineNumber', 'titleOrPackage', 'productIds', 'estimatedPrice', 'vendorRefNumber', 'funCodes'];
const sortableColumns = ['poLineNumber', 'titleOrPackage'];
const columnMapping = {
  poLineNumber: <FormattedMessage id="ui-orders.orderLineList.poLineNumber" />,
  updatedDate: <FormattedMessage id="ui-orders.orderLineList.updatedDate" />,
  titleOrPackage: <FormattedMessage id="ui-orders.orderLineList.titleOrPackage" />,
  estimatedPrice: <FormattedMessage id="ui-orders.cost.estimatedPrice" />,
  productIds: <FormattedMessage id="ui-orders.orderLineList.productIds" />,
  vendorRefNumber: <FormattedMessage id="ui-orders.orderLineList.vendorRefNumber" />,
  funCodes: <FormattedMessage id="ui-orders.orderLineList.funCodes" />,
};
const resultsFormatter = {
  updatedDate: line => <FolioFormattedDate value={line.metadata?.updatedDate} />,
  productIds: line => (line.details?.productIds || []).map(product => product.productId).join(', '),
  vendorRefNumber: line => (
    line.vendorDetail?.referenceNumbers?.map(({ refNumber }) => refNumber)?.join(', ') || <NoValue />
  ),
  estimatedPrice: line => (
    <AmountWithCurrencyField
      amount={line?.cost?.poLineEstimatedPrice}
      currency={line?.cost?.currency}
    />
  ),
};

const FindPOLine = ({ addLines, isSingleSelect, ...rest }) => {
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { funds } = useFunds();
  const { materialTypes } = useMaterialTypes();

  const { fetchOrderLines } = useFetchOrderLines();

  const refreshRecords = useCallback((filters) => {
    setIsLoading(true);

    setRecords([]);
    setTotalCount(0);
    setOffset(0);
    setSearchParams(filters);

    fetchOrderLines({ offset: 0, searchParams: filters })
      .then(({ poLines, totalRecords }) => {
        setTotalCount(totalRecords);
        setRecords(poLines);
      })
      .finally(() => setIsLoading(false));
  }, [fetchOrderLines]);

  const onNeedMoreData = () => {
    const newOffset = offset + RESULT_COUNT_INCREMENT;

    setIsLoading(true);

    fetchOrderLines({ offset: newOffset, searchParams })
      .then(({ poLines }) => {
        setOffset(newOffset);
        setRecords(prev => [...prev, ...poLines]);
      })
      .finally(() => setIsLoading(false));
  };

  const getResultsFormatter = useCallback(() => {
    const fundsMap = funds.reduce((acc, fund) => {
      acc[fund.id] = fund.code;

      return acc;
    }, {});

    return {
      ...resultsFormatter,
      funCodes: line => get(line, 'fundDistribution', []).map(fund => fundsMap[fund.fundId]).join(', '),
    };
  }, [funds]);

  const renderFilters = useCallback((activeFilters, applyFilters) => {
    return (
      <OrderLinesFilters
        activeFilters={activeFilters}
        applyFilters={applyFilters}
        funds={funds}
        materialTypes={materialTypes}
        disabled={isLoading}
      />
    );
  }, [funds, materialTypes, isLoading]);

  return (
    <FindRecords
      {...rest}
      modalLabel={modalLabel}
      resultsPaneTitle={resultsPaneTitle}
      idPrefix={idPrefix}
      columnWidths={columnWidths}
      visibleColumns={visibleColumns}
      sortableColumns={sortableColumns}
      columnMapping={columnMapping}
      resultsFormatter={getResultsFormatter()}
      records={records}
      totalCount={totalCount}
      refreshRecords={refreshRecords}
      onNeedMoreData={onNeedMoreData}
      searchableIndexes={searchableIndexes}
      isMultiSelect={!isSingleSelect}
      isLoading={isLoading}
      selectRecords={addLines}
      renderFilters={renderFilters}
    />
  );
};

FindPOLine.propTypes = {
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  isSingleSelect: PropTypes.bool,
  addLines: PropTypes.func.isRequired,
};

FindPOLine.defaultProps = {
  isSingleSelect: false,
  searchLabel: <FormattedMessage id="ui-plugin-find-po-line.addPOLine" />,
};

export default FindPOLine;
