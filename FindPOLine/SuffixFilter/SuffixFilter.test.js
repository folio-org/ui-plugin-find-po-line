import noop from 'lodash/noop';
import { IntlProvider } from 'react-intl';

import { render } from '@folio/jest-config-stripes/testing-library/react';

import { useSuffixes } from '../hooks';
import Filter from './SuffixFilter';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Selection: ({ id, dataOptions }) => (
    <ul id={id}>
      {
        dataOptions.map((o) => <li>{o.label}</li>)
      }
    </ul>
  ),
}));

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useSuffixes: jest.fn(),
}));

const suffixes = [
  {
    'id': 'db9f5d17-0ca3-4d14-ae49-16b63c8fc083',
    'name': 'suff',
    'description': 'Suffix for test purposes',
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

describe('SuffixFilter component', () => {
  beforeEach(() => {
    useSuffixes
      .mockClear()
      .mockReturnValue({ suffixes });
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

    const renderedFilterOptions = await findAllByText(/suff/);

    expect(renderedFilterOptions.length).toBe(suffixes.length);
  });
});
