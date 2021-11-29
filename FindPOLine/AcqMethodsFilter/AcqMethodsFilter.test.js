import React from 'react';
import { screen, render } from '@testing-library/react';
import { noop } from 'lodash';

import AcqMethodsFilter from './AcqMethodsFilter';

const records = [
  { id: '001', value: 'Acq-method 1' },
  { id: '002', value: 'Acq-method 2' },
];

const filterAccordionTitle = 'ui-orders.poLine.acquisitionMethod';

const renderFilter = () => render(
  <AcqMethodsFilter
    id="acq-methods"
    activeFilters={[]}
    name="acq-methods"
    onChange={noop}
    labelId={filterAccordionTitle}
    resources={{ acquisitionMethods: { records } }}
  />,
);

describe('AcqMethodsFilter component', () => {
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
