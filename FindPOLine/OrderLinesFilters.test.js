import { QueryClient, QueryClientProvider } from 'react-query';

import { render } from '@folio/jest-config-stripes/testing-library/react';

import { OrderLinesFilters } from './OrderLinesFilters';

jest.mock('@folio/stripes-acq-components/lib/ExpenseClassFilter/useExpenseClassOptions', () => ({
  useExpenseClassOptions: jest.fn().mockReturnValue([]),
}));

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderOrderLinesFilters = () => render(
  <OrderLinesFilters
    activeFilters={{}}
    onChange={jest.fn}
    applyFilters={jest.fn}
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
    expect(getByText('ui-orders.poLine.dateCreated')).toBeDefined();
    expect(getByText('ui-orders.line.accordion.vendor')).toBeDefined();
    expect(getByText('ui-orders.filter.collection')).toBeDefined();
    expect(getByText('ui-orders.filter.rush')).toBeDefined();
    expect(getByText('ui-orders.eresource.accessProvider')).toBeDefined();
    expect(getByText('ui-orders.eresource.expectedActivation')).toBeDefined();
    expect(getByText('stripes-acq-components.filter.expenseClass')).toBeDefined();
    expect(getByText('ui-orders.export.exportDate')).toBeDefined();
    expect(getAllByText('ui-orders.line.accordion.donor')).toHaveLength(2);
  });
});
