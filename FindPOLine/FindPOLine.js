import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';

import FindPOLineModal from './FindPOLineModal';
import css from './FindPOLine.css';

class FindPOLine extends React.Component {
  constructor(props) {
    super(props);

    this.connectedFindPOLineModal = props.stripes.connect(FindPOLineModal, { dataKey: this.props.dataKey });
  }

  state = {
    openModal: false,
  }

  getStyle() {
    const { marginTop0 } = this.props;

    return className(
      css.searchControl,
      { [css.marginTop0]: marginTop0 },
    );
  }

  openModal = () => this.setState({
    openModal: true,
  });

  closeModal = () => this.setState({
    openModal: false,
  });

  render() {
    const {
      disabled,
      searchButtonStyle,
      searchLabel,
      marginBottom0,
      stripes,
      addLines,
      isSingleSelect,
    } = this.props;

    return (
      <div className={this.getStyle()}>
        <Button
          data-test-plugin-find-po-line-button
          buttonStyle={searchButtonStyle}
          disabled={disabled}
          key="searchButton"
          marginBottom0={marginBottom0}
          onClick={this.openModal}
          tabIndex="-1"
        >
          {searchLabel}
        </Button>
        {this.state.openModal && (
          <this.connectedFindPOLineModal
            onCloseModal={this.closeModal}
            stripes={stripes}
            addLines={addLines}
            isSingleSelect={isSingleSelect}
          />
        )}
      </div>
    );
  }
}

FindPOLine.propTypes = {
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  stripes: PropTypes.object,
  dataKey: PropTypes.string.isRequired,
  addLines: PropTypes.func.isRequired,
  isSingleSelect: PropTypes.bool,
};

FindPOLine.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-po-line.addPOLine" />,
  isSingleSelect: false,
};

export default FindPOLine;
