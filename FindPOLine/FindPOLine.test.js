import React from 'react';
import { render } from '@testing-library/react';

import FindPOLine from './FindPOLine';

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
