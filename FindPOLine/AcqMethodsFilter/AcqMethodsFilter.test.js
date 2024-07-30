import noop from 'lodash/noop';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { useAcquisitionMethods } from '@folio/stripes-acq-components';

import AcqMethodsFilter from './AcqMethodsFilter';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useAcquisitionMethods: jest.fn(() => ({ acquisitionMethods: [] })),
}));

const acquisitionMethods = [
  { id: '001', value: 'Acq-method 1' },
  { id: '002', value: 'Acq-method 2' },
];

const filterAccordionTitle = 'ui-orders.poLine.acquisitionMethod';

const renderFilter = (props = {}) => render(
  <AcqMethodsFilter
    id="acq-methods"
    activeFilters={[]}
    name="acq-methods"
    onChange={noop}
    labelId={filterAccordionTitle}
    {...props}
  />,
);

describe('AcqMethodsFilter component', () => {
  beforeEach(() => {
    useAcquisitionMethods
      .mockClear()
      .mockReturnValue({ acquisitionMethods });
  });

  it('should display passed title', () => {
    renderFilter();

    expect(screen.getByText(filterAccordionTitle)).toBeDefined();
  });

  it('should be closed by default', () => {
    const { getByLabelText } = renderFilter();

    expect(getByLabelText(`${filterAccordionTitle} filter list`).getAttribute('aria-expanded') || 'false').toBe('false');
  });

  it('should render all passed options', async () => {
    renderFilter();

    const renderedFilterOptions = await screen.findAllByText(/Acq-method [0-9]/);

    expect(renderedFilterOptions.length).toBe(2);
  });
});
