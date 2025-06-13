import { render } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import FindPOLine from './FindPOLine';
import { useFetchOrderLines } from './hooks';

jest.mock('@rehooks/local-storage', () => ({
  useLocalStorage: jest.fn(() => [true]),
  writeStorage: jest.fn(),
}));

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  ExpenseClassFilter: jest.fn(() => <div>ExpenseClassFilter</div>),
  PluggableDonorsFilter: jest.fn(() => <div>PluggableDonorsFilter</div>),
  useAcquisitionMethods: jest.fn().mockReturnValue({ acquisitionMethods: [] }),
  useCentralOrderingSettings: jest.fn(() => ({ enabled: false })),
  useFunds: jest.fn().mockReturnValue({ funds: [] }),
  useOrderLine: jest.fn().mockReturnValue({ orderLine: {} }),
}));

jest.mock('@folio/stripes-acq-components/lib/hooks', () => ({
  ...jest.requireActual('@folio/stripes-acq-components/lib/hooks'),
  useAcquisitionUnits: jest.fn().mockReturnValue({ acquisitionsUnits: [] }),
  useLocationsQuery: jest.fn().mockReturnValue({ locations: [] }),
  useExpenseClassOptions: jest.fn().mockReturnValue([]),
  useOrganization: jest.fn().mockReturnValue({}),
  useTags: jest.fn().mockReturnValue({ tags: [] }),
  useTagsConfigs: jest.fn().mockReturnValue({ сonfigs: [] }),
  useUser: jest.fn().mockReturnValue({}),
}));

jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  useFetchOrderLines: jest.fn(),
  useMaterialTypes: jest.fn().mockReturnValue({ materialTypes: [] }),
  usePrefixes: jest.fn().mockReturnValue({ prefixes: [] }),
  useSuffixes: jest.fn().mockReturnValue({ suffixes: [] }),
}));

const renderFindPOLine = () => render(
  <FindPOLine
    addLines={jest.fn}
  />,
);

const poLines = [
  {
    id: '1',
    cost: {
      poLineEstimatedPrice: 100,
      currency: 'USD',
    },
    details: {
      productIds: [
        { productId: '12345', type: 'ISBN' },
      ],
    },
    vendorDetail: {
      referenceNumbers: [
        { refNumber: 'VENDOR123', type: 'VendorRef' },
      ],
    },
    fundDistribution: [
      {
        fundId: 'fund1',
        distributionType: 'percentage',
        value: 100,
      },
    ],
    metadata: {
      createdDate: '2023-01-01T00:00:00Z',
      updatedDate: '2023-01-02T00:00:00Z',
    },
  },
];

describe('FindPOLine component', () => {
  beforeEach(() => {
    useFetchOrderLines.mockReturnValue({
      fetchOrderLines: jest.fn(() => Promise.resolve({ poLines, totalRecords: poLines.length })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render plugin trigger', async () => {
    const { getByText } = renderFindPOLine();

    expect(getByText('ui-plugin-find-po-line.addPOLine')).toBeInTheDocument();
  });

  it('should render plugin modal', async () => {
    const { getByText } = renderFindPOLine();

    await userEvent.click(getByText('ui-plugin-find-po-line.addPOLine'));

    expect(getByText('ui-plugin-find-po-line.modal.title')).toBeInTheDocument();
  });
});
