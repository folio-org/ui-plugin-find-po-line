import { render } from '@folio/jest-config-stripes/testing-library/react';

import FindPOLine from './FindPOLine';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useFunds: jest.fn().mockReturnValue({ funds: [] }),
}));

jest.mock('./hooks', () => ({
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
