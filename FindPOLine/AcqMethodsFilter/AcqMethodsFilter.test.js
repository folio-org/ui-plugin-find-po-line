import { cleanup, render, screen } from '@testing-library/react';
import { noop } from 'lodash';
import '@folio/stripes-acq-components/test/jest/__mock__';

import AcqMethodsFilter from './AcqMethodsFilter';

const records = [
  { value: 'Gift', id: '001' },
  { value: 'Other', id: '002' },
];

const defaultProps = {
  id: 'acq-methods',
  labelId: 'acq-methods',
  name: 'acq-methods',
  onChange: noop,
  activeFilters: [],
  resources: { acquisitionMethods: { records } },
};

const renderAcqMethodsFilter = (props = {}) => (render(
  <AcqMethodsFilter
    {...defaultProps}
    {...props}
  />,
));

describe('AcqMethodsFilter component', () => {
  afterEach(cleanup);

  it('should render all passed options', () => {
    renderAcqMethodsFilter();

    expect(screen.getByText(records[0].value)).toBeInTheDocument();
    expect(screen.getByText(records[1].value)).toBeInTheDocument();
  });
});
