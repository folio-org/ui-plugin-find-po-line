import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import {
  get,
  noop,
  pickBy,
} from 'lodash';

import {
  SearchAndSort,
} from '@folio/stripes/smart-components';
import {
  Modal,
  Button,
  Checkbox,
} from '@folio/stripes/components';
import {
  getActiveFilters,
  handleFilterChange,
} from '@folio/orders/src/common/utils';
import {
  OrderLinesList,
  columnMapping as baseColumnMapping,
} from '@folio/orders/src/OrderLinesList/OrderLinesList';

import packageInfo from '../../package';

import css from './FindPOLineModal.css';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const title = <FormattedMessage id="ui-plugin-find-po-line.meta.title" />;
const baseVisibleColumns = ['poLineNumber', 'title', 'productIds', 'vendorRefNumber', 'funCodes'];
const sortableColumns = ['poLineNumber', 'title', 'vendorRefNumber'];
const columnWidths = {
  isChecked: '7%',
  poLineNumber: '11%',
  title: '32%',
  productIds: '18%',
  vendorRefNumber: '14%',
  funCodes: '18%',
};

const reduceLinesToMap = (lines, isChecked = false) => {
  return lines.reduce((acc, line) => {
    acc[line.id] = isChecked ? lines : null;

    return acc;
  }, {});
};

class FindPOLineModal extends React.Component {
  static manifest = Object.freeze({
    ...OrderLinesList.manifest,
  });

  constructor(props) {
    super(props);

    this.getActiveFilters = getActiveFilters.bind(this);
    this.handleFilterChange = handleFilterChange.bind(this);
    this.renderFilters = OrderLinesList.prototype.renderFilters.bind(this);
  }

  state = {
    checkedLinesMap: {},
    isAllChecked: false,
  }

  closeModal = () => {
    this.props.onCloseModal();
  }

  onSelectRow = (e, line) => {
    if (this.props.isSingleSelect) {
      this.props.addLines([line]);
      this.closeModal();
    } else {
      const { id } = line;

      this.setState(({ checkedLinesMap }) => ({
        checkedLinesMap: {
          ...checkedLinesMap,
          [id]: checkedLinesMap[id] ? null : line,
        },
        isAllChecked: false,
      }));
    }
  }

  save = () => {
    const lines = Object.values(pickBy(this.state.checkedLinesMap));

    this.props.addLines(lines);
    this.closeModal();
  }

  selectAll = () => {
    this.setState((state, props) => {
      const isAllChecked = !state.isAllChecked;
      const lines = get(props.resources, 'records.records', []);
      const checkedLinesMap = reduceLinesToMap(lines, isAllChecked);

      return {
        checkedLinesMap,
        isAllChecked,
      };
    });
  }

  render() {
    const { isSingleSelect, resources, mutator, stripes } = this.props;
    const { checkedLinesMap, isAllChecked } = this.state;

    const checkedLinesLength = Object.values(pickBy(checkedLinesMap)).length;
    const columnMapping = isSingleSelect
      ? baseColumnMapping
      : {
        ...baseColumnMapping,
        isChecked: (
          <Checkbox
            checked={isAllChecked}
            onChange={this.selectAll}
            type="checkbox"
          />
        ),
      };

    const translatedSearchableIndexes = OrderLinesList.prototype.getTranslateSearchableIndexes.call(this);

    const resultsFormatter = isSingleSelect
      ? OrderLinesList.prototype.getResultsFormatter.call(this)
      : {
        ...OrderLinesList.prototype.getResultsFormatter.call(this),
        isChecked: data => (
          <Checkbox
            data-test-find-po-line-modal-select-all
            type="checkbox"
            checked={Boolean(checkedLinesMap[data.id])}
          />
        ),
      };

    const footer = (
      <div className={css.findPOLineModalFooter}>
        <Button
          marginBottom0
          onClick={this.closeModal}
          className="left"
        >
          <FormattedMessage id="ui-plugin-find-po-line.modal.footer.close" />
        </Button>
        {!isSingleSelect && (
          <React.Fragment>
            <div>
              <FormattedMessage
                id="ui-plugin-find-po-line.modal.footer.totalSelected"
                values={{ count: checkedLinesLength }}
              />
            </div>
            <Button
              marginBottom0
              data-test-find-po-line-modal-save
              onClick={this.save}
              disabled={!checkedLinesLength}
              buttonStyle="primary"
            >
              <FormattedMessage id="ui-plugin-find-po-line.modal.footer.save" />
            </Button>
          </React.Fragment>
        )}
      </div>
    );

    const visibleColumns = isSingleSelect
      ? baseVisibleColumns
      : ['isChecked', ...baseVisibleColumns];

    return (
      <Modal
        data-test-find-po-line-modal
        dismissible
        enforceFocus={false}
        footer={footer}
        label={<FormattedMessage id="ui-plugin-find-po-line.modal.title" />}
        onClose={this.closeModal}
        open
        contentClass={css.findPOLineModalContent}
        style={{ minHeight: '500px' }}
        size="large"
      >
        <SearchAndSort
          packageInfo={this.props.packageInfo || packageInfo}
          objectName="order-line"
          title={title}
          visibleColumns={visibleColumns}
          columnMapping={columnMapping}
          columnWidths={columnWidths}
          sortableColumns={sortableColumns}
          maxSortKeys={1}
          resultsFormatter={resultsFormatter}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          parentResources={resources}
          parentMutator={mutator}
          onFilterChange={this.handleFilterChange}
          renderFilters={this.renderFilters}
          searchableIndexes={translatedSearchableIndexes}
          onChangeIndex={this.onChangeIndex}
          stripes={stripes}
          viewRecordComponent={noop}
          disableRecordCreation
          browseOnly
          showSingleResult
          onSelectRow={this.onSelectRow}
          viewRecordPerms=""
        />
      </Modal>
    );
  }
}

FindPOLineModal.propTypes = {
  packageInfo: PropTypes.object,
  stripes: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  addLines: PropTypes.func.isRequired,
  isSingleSelect: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  intl: intlShape.isRequired,
};

export default injectIntl(FindPOLineModal);
