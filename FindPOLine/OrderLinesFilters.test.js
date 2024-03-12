import { QueryClient, QueryClientProvider } from 'react-query';

import { render, act } from '@folio/jest-config-stripes/testing-library/react';
import { AcqDateRangeFilter } from '@folio/stripes-acq-components';

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
});
