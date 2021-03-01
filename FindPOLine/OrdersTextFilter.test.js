import React from 'react';
import { render } from '@testing-library/react';

import OrdersTextFilter from './OrdersTextFilter';

const filterLabelId = 'textFilter';

const renderOrdersTextFilter = (labelId = filterLabelId) => (render(
  <OrdersTextFilter
    id="OrdersTextFilter"
    activeFilters={[]}
    name="OrdersTextFilter"
    onChange={jest.fn}
    labelId={labelId}
  />,
));

describe('OrdersTextFilter component', () => {
  it('should display title', () => {
    const { getByText } = renderOrdersTextFilter();

    expect(getByText(filterLabelId)).toBeDefined();
  });
});
