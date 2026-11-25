import { QueryClient, QueryClientProvider } from 'react-query';

import {
  act,
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import {
  AcqDateRangeFilter,
  CUSTOM_FIELDS_FIXTURE,
} from '@folio/stripes-acq-components';

import { FILTERS } from './constants';
import { OrderLinesFilters } from './OrderLinesFilters';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useExpenseClassOptions: jest.fn().mockReturnValue([]),
  AcqDateRangeFilter: jest.fn().mockReturnValue('AcqDateRangeFilter'),
}));

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderOrderLinesFilters = (props) => render(
  <OrderLinesFilters
    activeFilters={{}}
    onChange={jest.fn}
    applyFilters={jest.fn}
    {...props}
  />,
  { wrapper },
);

describe('OrderLinesFilters component', () => {
  afterEach(() => {
    AcqDateRangeFilter.mockReturnValue('AcqDateRangeFilter');
  });

  it('should display filters', () => {
    const { getByText, getAllByText } = renderOrderLinesFilters();

    expect(getByText('ui-orders.poLine.receiptStatus')).toBeDefined();
    expect(getByText('ui-orders.poLine.paymentStatus')).toBeDefined();
    expect(getByText('ui-orders.orderDetails.orderNumberPrefix')).toBeDefined();
    expect(getByText('ui-orders.orderDetails.orderNumberSuffix')).toBeDefined();
    expect(getByText('stripes-acq-components.filter.acqUnit')).toBeDefined();
    expect(getByText('ui-orders.poLine.acquisitionMethod')).toBeDefined();
    expect(getByText('ui-orders.line.accordion.location')).toBeDefined();
    expect(getByText('stripes-acq-components.filter.fundCode')).toBeDefined();
    expect(getByText('ui-orders.poLine.orderFormat')).toBeDefined();
    expect(getByText('ui-orders.line.accordion.vendor')).toBeDefined();
    expect(getByText('ui-orders.filter.collection')).toBeDefined();
    expect(getByText('ui-orders.filter.rush')).toBeDefined();
    expect(getByText('ui-orders.eresource.accessProvider')).toBeDefined();
    expect(getByText('stripes-acq-components.filter.expenseClass')).toBeDefined();
    expect(getAllByText('ui-orders.line.accordion.donor')).toHaveLength(2);
  });

  it('should display filters', async () => {
    AcqDateRangeFilter.mockClear();
    const applyFilters = jest.fn();
    const filterValues = { name: 'createdDate', values: ['2021-01-01:2021-01-31'] };

    renderOrderLinesFilters({
      applyFilters,
      activeFilters: {
        createdDate: filterValues.values[0],
        expectedReceiptDate: ['2021-01-01:2021-01-31'],
      },
    });

    act(() => {
      AcqDateRangeFilter.mock.calls[0][0].onChange(filterValues);
    });
    expect(applyFilters).toHaveBeenCalledWith(filterValues.name, filterValues.values[0]);
  });

  it('should display exported and transmission method filters next to the export date filter', () => {
    AcqDateRangeFilter.mockImplementation(({ name }) => name);

    renderOrderLinesFilters();

    const exportedFilter = document.getElementById(FILTERS.EXPORTED);
    const transmissionMethodFilter = document.getElementById(FILTERS.TRANSMISSION_METHOD);

    expect(exportedFilter).toHaveTextContent('ui-plugin-find-po-line.filter.exported');
    expect(exportedFilter.nextSibling.textContent).toBe(FILTERS.EXPORT_DATE);
    expect(transmissionMethodFilter).toHaveTextContent('ui-plugin-find-po-line.filter.transmissionMethod');
    expect(transmissionMethodFilter.previousSibling.textContent).toBe(FILTERS.EXPORT_DATE);
  });

  it('should display transmission method options', () => {
    renderOrderLinesFilters();

    expect(screen.getByText('ui-plugin-find-po-line.filter.transmissionMethod.email')).toBeInTheDocument();
    expect(screen.getByText('ui-plugin-find-po-line.filter.transmissionMethod.ftp')).toBeInTheDocument();
    expect(screen.getByText('ui-plugin-find-po-line.filter.transmissionMethod.fileDownload')).toBeInTheDocument();
  });

  it('should display correct filters for custom fields', () => {
    renderOrderLinesFilters({ 'customFields': CUSTOM_FIELDS_FIXTURE });

    expect(screen.getByText('stripes-smart-components.customFields Datepicker')).toBeInTheDocument();
    expect(screen.getByText('stripes-smart-components.customFields Singleselect')).toBeInTheDocument();
    expect(screen.getByText('stripes-smart-components.customFields Multiselect')).toBeInTheDocument();
    expect(screen.queryByText('stripes-smart-components.customFields Long text')).toBeNull();
    expect(screen.queryByText('stripes-smart-components.customFields Short text')).toBeNull();
  });
});
