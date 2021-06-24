import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';

import {
  makeQueryFunction,
  StripesConnectedSource,
} from '@folio/stripes/smart-components';
import {
  stripesConnect,
} from '@folio/stripes/core';
import { NoValue } from '@folio/stripes/components';
import {
  baseManifest,
  contributorNameTypesManifest,
  DICT_CONTRIBUTOR_NAME_TYPES,
  DICT_IDENTIFIER_TYPES,
  FolioFormattedDate,
  fundsManifest,
  identifierTypesManifest,
  LINES_API,
  locationsManifest,
  organizationsManifest,
} from '@folio/stripes-acq-components';

import { filterConfig } from './OrdersLinesFilterConfig';
import { queryTemplate } from './OrdersLinesSearchConfig';
import OrderLinesFilters from './OrderLinesFilters';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const columnWidths = {
  isChecked: '7%',
  poLineNumber: '11%',
  titleOrPackage: '32%',
  productIds: '18%',
  vendorRefNumber: '14%',
  funCodes: '18%',
};
const visibleColumns = ['poLineNumber', 'titleOrPackage', 'productIds', 'vendorRefNumber', 'funCodes'];
const sortableColumns = ['poLineNumber', 'titleOrPackage'];
const idPrefix = 'uiPluginFindPOLine-';
const modalLabel = <FormattedMessage id="ui-plugin-find-po-line.modal.title" />;
const columnMapping = {
  poLineNumber: <FormattedMessage id="ui-orders.orderLineList.poLineNumber" />,
  updatedDate: <FormattedMessage id="ui-orders.orderLineList.updatedDate" />,
  titleOrPackage: <FormattedMessage id="ui-orders.orderLineList.titleOrPackage" />,
  productIds: <FormattedMessage id="ui-orders.orderLineList.productIds" />,
  vendorRefNumber: <FormattedMessage id="ui-orders.orderLineList.vendorRefNumber" />,
  funCodes: <FormattedMessage id="ui-orders.orderLineList.funCodes" />,
};
const resultsFormatter = {
  updatedDate: line => <FolioFormattedDate value={get(line, 'metadata.updatedDate')} />,
  productIds: line => get(line, 'details.productIds', []).map(product => product.productId).join(', '),
  vendorRefNumber: line => (
    line.vendorDetail?.referenceNumbers?.map(({ refNumber }) => refNumber)?.join(', ') || <NoValue />
  ),
};

class FindPOLineContainer extends React.Component {
  static manifest = Object.freeze({
    query: {
      initialValue: {
        qindex: '',
        query: '',
        filters: '',
        sort: 'poLineNumber',
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      throwErrors: false,
      path: LINES_API,
      records: 'poLines',
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            queryTemplate,
            {
              updatedDate: 'metadata.updatedDate',
              vendorRefNumber: 'vendorDetail.refNumber',
            },
            filterConfig,
            2,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    locations: locationsManifest,
    materialTypes: {
      ...baseManifest,
      path: 'material-types',
      params: {
        query: 'cql.allRecords=1 sortby name',
      },
      records: 'mtypes',
    },
    vendors: organizationsManifest,
    funds: fundsManifest,
    [DICT_IDENTIFIER_TYPES]: identifierTypesManifest,
    [DICT_CONTRIBUTOR_NAME_TYPES]: contributorNameTypesManifest,
  });

  constructor(props, context) {
    super(props, context);

    this.logger = props.stripes.logger;
    this.log = this.logger.log.bind(this.logger);
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger);
    const { filters, mutator } = this.props;
    let query = '';

    if (filters) {
      query = { filters };
    }
    mutator.query.replace(query);
  }

  componentDidUpdate() {
    this.source.update(this.props);
  }

  onNeedMoreData = () => {
    if (this.source) {
      this.source.fetchMore(RESULT_COUNT_INCREMENT);
    }
  };

  querySetter = ({ nsValues, state }) => {
    if (/reset/.test(state.changeType)) {
      this.props.mutator.query.replace(nsValues);
    } else {
      this.props.mutator.query.update(nsValues);
    }
  }

  getResultsFormatter() {
    const { resources } = this.props;
    const fundsMap = get(resources, 'funds.records', []).reduce((acc, fund) => {
      acc[fund.id] = fund.code;

      return acc;
    }, {});

    return {
      ...resultsFormatter,
      funCodes: line => get(line, 'fundDistribution', []).map(fund => fundsMap[fund.fundId]).join(', '),
    };
  }

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }

  renderFilters = (activeFilters, onChangeHandlers) => {
    const { resources } = this.props;
    const materialTypes = get(resources, 'materialTypes.records') || [];
    const funds = get(resources, 'funds.records') || [];
    const vendors = get(resources, 'vendors.records') || [];
    const onChange = (filter) => {
      onChangeHandlers.state({
        ...activeFilters,
        [filter.name]: filter.values,
      });
    };

    return (
      <OrderLinesFilters
        activeFilters={activeFilters}
        funds={funds}
        materialTypes={materialTypes}
        onChange={onChange}
        vendors={vendors}
      />
    );
  }

  render() {
    const {
      resources,
      children,
    } = this.props;

    if (this.source) {
      this.source.update(this.props);
    }

    return children({
      columnMapping,
      columnWidths,
      idPrefix,
      modalLabel,
      onNeedMoreData: this.onNeedMoreData,
      queryGetter: this.queryGetter,
      querySetter: this.querySetter,
      renderFilters: this.renderFilters,
      resultsFormatter: this.getResultsFormatter(),
      sortableColumns,
      source: this.source,
      visibleColumns,
      data: {
        records: get(resources, 'records.records', []),
      },
    });
  }
}

FindPOLineContainer.propTypes = {
  stripes: PropTypes.object.isRequired,
  children: PropTypes.func,
  filters: PropTypes.string,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
};

export default stripesConnect(FindPOLineContainer, { dataKey: 'find_PO_line' });
