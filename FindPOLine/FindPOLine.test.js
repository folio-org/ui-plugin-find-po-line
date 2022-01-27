import React from 'react';
import { render } from '@testing-library/react';

import FindPOLine from './FindPOLine';

jest.mock('./hooks', () => ({
  useFunds: jest.fn().mockReturnValue({ funds: [] }),
  useMaterialTypes: jest.fn().mockReturnValue({ materialTypes: [] }),
  useFetchOrderLines: jest.fn().mockReturnValue({ fetchOrderLines: jest.fn() }),
}));

const renderFindPOLine = () => (render(
  <FindPOLine
    addLines={jest.fn}
  />,
));

describe('FindPOLine component', () => {
  it('should render find-poLine plugin', async () => {
    const { getByText } = renderFindPOLine();

    expect(getByText('ui-plugin-find-po-line.addPOLine')).toBeDefined();
  });
});
