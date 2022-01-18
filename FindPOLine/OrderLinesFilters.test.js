import React from 'react';
import { render } from '@testing-library/react';

import OrderLinesFilters from './OrderLinesFilters';

jest.mock('./ExpenseClassFilter/useExpenseClassOptions', () => ({
  useExpenseClassOptions: jest.fn().mockReturnValue([]),
}));

const renderOrderLinesFilters = () => (render(
  <OrderLinesFilters
    activeFilters={{}}
    onChange={jest.fn}
  />,
));

describe('OrderLinesFilters component', () => {
  it('should display filters', () => {
    const { getByText } = renderOrderLinesFilters();

    expect(getByText('ui-orders.poLine.receiptStatus')).toBeDefined();
    expect(getByText('ui-orders.poLine.paymentStatus')).toBeDefined();
    expect(getByText('ui-orders.orderDetails.orderNumberPrefix')).toBeDefined();
    expect(getByText('ui-orders.orderDetails.orderNumberSuffix')).toBeDefined();
    expect(getByText('stripes-acq-components.filter.acqUnit')).toBeDefined();
    expect(getByText('ui-orders.poLine.acquisitionMethod')).toBeDefined();
    expect(getByText('ui-orders.line.accordion.location')).toBeDefined();
    expect(getByText('ui-orders.filter.fundCode')).toBeDefined();
    expect(getByText('ui-orders.poLine.orderFormat')).toBeDefined();
    expect(getByText('ui-orders.poLine.dateCreated')).toBeDefined();
    expect(getByText('ui-orders.line.accordion.vendor')).toBeDefined();
    expect(getByText('ui-orders.filter.collection')).toBeDefined();
    expect(getByText('ui-orders.filter.rush')).toBeDefined();
    expect(getByText('ui-orders.eresource.accessProvider')).toBeDefined();
    expect(getByText('ui-orders.eresource.expectedActivation')).toBeDefined();
    expect(getByText('ui-orders.filter.expenseClass')).toBeDefined();
    expect(getByText('ui-orders.export.exportDate')).toBeDefined();
  });
});
