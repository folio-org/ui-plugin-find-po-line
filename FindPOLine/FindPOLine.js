import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import {
  useState,
  useCallback,
} from 'react';
import { FormattedMessage } from 'react-intl';

import { NoValue } from '@folio/stripes/components';
import {
  checkIfUserInCentralTenant,
  useStripes,
} from '@folio/stripes/core';
import {
  AmountWithCurrencyField,
  FindRecords,
  FolioFormattedDate,
  PLUGIN_RESULT_COUNT_INCREMENT,
  useCentralOrderingSettings,
  useFunds,
} from '@folio/stripes-acq-components';

import { OrderLinesFilters } from './OrderLinesFilters';
import { searchableIndexes } from './OrderLinesSearchConfig';
import {
  useFetchOrderLines,
  useMaterialTypes,
} from './hooks';

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

const INIT_PAGINATION = { limit: PLUGIN_RESULT_COUNT_INCREMENT, offset: 0 };

const FindPOLine = ({
  addLines,
  crossTenant: crossTenantProp,
  isSingleSelect,
  tenantId,
  ...rest
}) => {
  const stripes = useStripes();

  const [totalCount, setTotalCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { funds } = useFunds({ tenantId });
  const { materialTypes } = useMaterialTypes({ tenantId });
  const [pagination, setPagination] = useState(INIT_PAGINATION);

  const { enabled: isCentralOrderingEnabled } = useCentralOrderingSettings({
    enabled: isUndefined(crossTenantProp) && checkIfUserInCentralTenant(stripes),
  });

  const crossTenant = isUndefined(crossTenantProp)
    ? isCentralOrderingEnabled
    : crossTenantProp;

  const { fetchOrderLines } = useFetchOrderLines({ tenantId });

  const refreshRecords = useCallback((filters) => {
    setIsLoading(true);

    setRecords([]);
    setTotalCount(0);
    setPagination(INIT_PAGINATION);
    setSearchParams(filters);

    fetchOrderLines({ ...INIT_PAGINATION, searchParams: filters })
      .then(({ poLines, totalRecords }) => {
        setTotalCount(totalRecords);
        setRecords(poLines);
      })
      .finally(() => setIsLoading(false));
  }, [fetchOrderLines]);

  const onNeedMoreData = useCallback((newPagination) => {
    setIsLoading(true);

    fetchOrderLines({ ...newPagination, searchParams })
      .then(({ poLines }) => {
        setPagination(newPagination);
        setRecords(poLines);
      })
      .finally(() => setIsLoading(false));
  }, [fetchOrderLines, searchParams]);

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
        crossTenant={crossTenant}
        tenantId={tenantId}
      />
    );
  }, [
    crossTenant,
    funds,
    isLoading,
    materialTypes,
    tenantId,
  ]);

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
      pagination={pagination}
    />
  );
};

FindPOLine.propTypes = {
  disabled: PropTypes.bool,
  crossTenant: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  isSingleSelect: PropTypes.bool,
  addLines: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
};

FindPOLine.defaultProps = {
  isSingleSelect: false,
  searchLabel: <FormattedMessage id="ui-plugin-find-po-line.addPOLine" />,
};

export default FindPOLine;
