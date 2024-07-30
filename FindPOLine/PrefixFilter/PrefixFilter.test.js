import noop from 'lodash/noop';
import { IntlProvider } from 'react-intl';

import { render } from '@folio/jest-config-stripes/testing-library/react';

import { usePrefixes } from '../hooks';
import Filter from './PrefixFilter';

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  usePrefixes: jest.fn(),
}));

const prefixes = [
  {
    'id': 'db9f5d17-0ca3-4d14-ae49-16b63c8fc083',
    'name': 'pref',
    'description': 'Prefix for test purposes',
  },
];

const filterAccordionTitle = 'labelId';

const renderFilter = (props = {}) => render(
  <IntlProvider locale="en">
    <Filter
      id="filterId"
      activeFilters={[]}
      name="filterName"
      onChange={noop}
      labelId={filterAccordionTitle}
      {...props}
    />
  </IntlProvider>,
);

describe('PrefixFilter component', () => {
  beforeEach(() => {
    usePrefixes
      .mockClear()
      .mockReturnValue({ prefixes });
  });

  it('should display passed title', () => {
    const { getByText } = renderFilter();

    expect(getByText(filterAccordionTitle)).toBeDefined();
  });

  it('should be closed by default', () => {
    const { getByLabelText } = renderFilter();

    expect(getByLabelText(`${filterAccordionTitle} filter list`).getAttribute('aria-expanded') || 'false').toBe('false');
  });

  it('should render all passed options', async () => {
    const { findAllByText } = renderFilter();

    const renderedFilterOptions = await findAllByText(/pref/);

    expect(renderedFilterOptions.length).toBe(prefixes.length);
  });
});
