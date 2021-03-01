import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import FindPOLineContainer from './FindPOLineContainer';

const mockFetchMore = jest.fn();

jest.mock('@folio/stripes-smart-components/lib/SearchAndSort/ConnectedSource/StripesConnectedSource', () => {
  return jest.fn().mockImplementation(() => {
    return { fetchMore: mockFetchMore };
  });
});

jest.mock('./OrderLinesFilters', () => {
  return jest.fn().mockImplementation(() => {
    return <span>OrderLinesFilters</span>;
  });
});

// eslint-disable-next-line react/prop-types
const children = ({ onNeedMoreData, querySetter, renderFilters }) => (
  <>
    {renderFilters()}
    <button
      type="button"
      onClick={onNeedMoreData}
    >
      OnNeedMoreData
    </button>
    <button
      type="button"
      onClick={() => querySetter({ state: {} })}
    >
      UpdateResources
    </button>
  </>
);

const renderFindPOLineContainer = (mutator, filters) => (render(
  <FindPOLineContainer
    mutator={mutator}
    filters={filters}
  >
    {children}
  </FindPOLineContainer>,
));

describe('FindPOLineContainer component', () => {
  let mutator;

  beforeEach(() => {
    mutator = {
      records: {
        GET: jest.fn(),
      },
      query: {
        update: jest.fn(),
        replace: jest.fn(),
      },
    };
  });

  it('should not fetch poLines and poLines deatails data when plugin is open by default', async () => {
    await act(async () => {
      renderFindPOLineContainer(mutator, 'filters');
    });

    expect(mutator.query.replace).toHaveBeenCalled();
    expect(mutator.records.GET).not.toHaveBeenCalled();
  });

  it('should fetch more data', async () => {
    renderFindPOLineContainer(mutator);

    await waitFor(() => {
      user.click(screen.getByText('OnNeedMoreData'));
    });

    expect(mockFetchMore).toHaveBeenCalledTimes(1);
  });

  it('should update data', async () => {
    renderFindPOLineContainer(mutator);

    await waitFor(() => {
      user.click(screen.getByText('UpdateResources'));
    });

    expect(mutator.query.update).toHaveBeenCalled();
  });

  it('should render Order lines filters', async () => {
    let getByText;

    await act(async () => {
      const rerender = renderFindPOLineContainer(mutator);

      getByText = rerender.getByText;
    });

    expect(getByText('OrderLinesFilters')).toBeDefined();
  });
});
