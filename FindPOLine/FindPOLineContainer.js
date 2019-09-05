import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';

import {
  StripesConnectedSource,
} from '@folio/stripes/smart-components';
import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  OrderLinesList,
  columnMapping,
} from '@folio/orders/src/OrderLinesList/OrderLinesList';
import OrderLinesFilters from '@folio/orders/src/OrderLinesList/OrderLinesFilters';

const RESULT_COUNT_INCREMENT = 30;
const columnWidths = {
  isChecked: '7%',
  poLineNumber: '11%',
  title: '32%',
  productIds: '18%',
  vendorRefNumber: '14%',
  funCodes: '18%',
};
const visibleColumns = ['poLineNumber', 'title', 'productIds', 'vendorRefNumber', 'funCodes'];
const sortableColumns = ['poLineNumber', 'title', 'vendorRefNumber'];
const idPrefix = 'uiPluginFindPOLine-';
const modalLabel = <FormattedMessage id="ui-plugin-find-po-line.modal.title" />;

class FindPOLineContainer extends React.Component {
  static manifest = Object.freeze({
    ...OrderLinesList.manifest,
  });

  constructor(props, context) {
    super(props, context);

    this.logger = props.stripes.logger;
    this.log = this.logger.log.bind(this.logger);
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger);
    this.props.mutator.query.replace('');
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

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }

  renderFilters = (activeFilters, onChangeHandlers) => {
    const { mutator: { query }, resources } = this.props;
    const locations = get(resources, 'locations.records') || [];
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
        locations={locations}
        materialTypes={materialTypes}
        onChange={onChange}
        queryMutator={query}
        vendors={vendors}
      />
    );
  }

  render() {
    const {
      resources,
      children,
    } = this.props;
    const resultsFormatter = OrderLinesList.prototype.getResultsFormatter.call(this);

    return children({
      columnMapping,
      columnWidths,
      idPrefix,
      modalLabel,
      onNeedMoreData: this.onNeedMoreData,
      queryGetter: this.queryGetter,
      querySetter: this.querySetter,
      renderFilters: this.renderFilters,
      resultsFormatter,
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
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
};

export default stripesConnect(FindPOLineContainer, { dataKey: 'find_PO_line' });
