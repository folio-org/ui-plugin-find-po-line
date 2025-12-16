import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import { PLUGIN_RESULT_COUNT_INCREMENT } from '@folio/stripes-acq-components';
import { NO_DST_TIMEZONES } from '@folio/stripes-acq-components/test/jest/fixtures';

import { useFetchOrderLines } from './useFetchOrderLines';
import { FILTERS } from '../../constants';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
  useStripes: jest.fn(),
}));

const poLine = { id: 'poLineId' };

const getMock = jest.fn().mockReturnValue({
  json: () => ({ poLines: [poLine], totalRecords: 1 }),
});

const renderTestHook = (...args) => renderHook(() => useFetchOrderLines(...args));

describe('useFetchOrderLines', () => {
  beforeEach(() => {
    useOkapiKy.mockReturnValue({ get: getMock });
    useStripes.mockReturnValue({ timezone: 'UTC' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not make a get a request to fetch poLines when fetchOrderLines is called and without filters', async () => {
    const { result } = renderTestHook();

    await result.current.fetchOrderLines({ searchParams: {}, offset: 15 });

    expect(getMock).not.toHaveBeenCalled();
  });

  it('should make a get a request to fetch poLines when fetchOrderLines is called and with filters', async () => {
    const { result } = renderTestHook();

    await result.current.fetchOrderLines({ searchParams: { receiptStatus: ['pending'] }, offset: 15 });

    expect(getMock).toHaveBeenCalledWith(
      'orders/order-lines',
      {
        searchParams: {
          limit: PLUGIN_RESULT_COUNT_INCREMENT,
          offset: 15,
          query: '(receiptStatus==("pending")) sortby metadata.updatedDate/sort.descending',
        },
      },
    );
  });

  describe('Datetime filters', () => {
    const dateTimeConfig = {
      from: '2014-07-14',
      to: '2020-07-14',
    };

    const expectedResultsDict = {
      [NO_DST_TIMEZONES.AFRICA_DAKAR]: {
        start: '2014-07-14T00:00:00.000',
        end: '2020-07-14T23:59:59.999',
      },
      [NO_DST_TIMEZONES.AMERICA_BOGOTA]: {
        start: '2014-07-14T05:00:00.000',
        end: '2020-07-15T04:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_DUBAI]: {
        start: '2014-07-13T20:00:00.000',
        end: '2020-07-14T19:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_SHANGHAI]: {
        start: '2014-07-13T16:00:00.000',
        end: '2020-07-14T15:59:59.999',
      },
      [NO_DST_TIMEZONES.ASIA_TOKIO]: {
        start: '2014-07-13T15:00:00.000',
        end: '2020-07-14T14:59:59.999',
      },
      [NO_DST_TIMEZONES.EUROPE_MOSCOW]: {
        start: '2014-07-13T20:00:00.000',
        end: '2020-07-14T20:59:59.999',
      },
      [NO_DST_TIMEZONES.PACIFIC_TAHITI]: {
        start: '2014-07-14T10:00:00.000',
        end: '2020-07-15T09:59:59.999',
      },
      [NO_DST_TIMEZONES.UTC]: {
        start: '2014-07-14T00:00:00.000',
        end: '2020-07-14T23:59:59.999',
      },
    };

    const datetimeFilters = [
      FILTERS.DATE_CREATED,
      FILTERS.DATE_UPDATED,
    ];

    const dateFiltersMap = {
      [FILTERS.EXPORT_DATE]: FILTERS.EXPORT_DATE,
      [FILTERS.EXPECTED_ACTIVATION_DATE]: `eresource.${FILTERS.EXPECTED_ACTIVATION_DATE}`,
      [FILTERS.SUBSCRIPTION_FROM]: `details.${FILTERS.SUBSCRIPTION_FROM}`,
      [FILTERS.SUBSCRIPTION_TO]: `details.${FILTERS.SUBSCRIPTION_TO}`,
      [FILTERS.ACTUAL_RECEIPT_DATE]: FILTERS.ACTUAL_RECEIPT_DATE,
      [FILTERS.EXPECTED_RECEIPT_DATE]: `physical.${FILTERS.EXPECTED_RECEIPT_DATE}`,
      [FILTERS.RECEIPT_DUE]: `physical.${FILTERS.RECEIPT_DUE}`,
      [FILTERS.CLAIM_SENT]: FILTERS.CLAIM_SENT,
    };

    describe.each(datetimeFilters)('Datetime range filter: %s', (filter) => {
      it.each(Object.keys(expectedResultsDict))('should properly apply filter for the timezone - %s', async (timezone) => {
        useStripes.mockReturnValue({ timezone });

        const { start, end } = expectedResultsDict[timezone];

        const { result } = renderTestHook();

        await result.current.fetchOrderLines({
          searchParams: {
            [filter]: [dateTimeConfig.from, dateTimeConfig.to].join(':'),
          },
        });

        expect(getMock.mock.calls[0][1].searchParams.query).toContain(`(${filter}>="${start}" and ${filter}<="${end}")`);
      });
    });

    describe.each(Object.keys(dateFiltersMap))('Date range filter: %s', (filter) => {
      it.each(Object.keys(expectedResultsDict))('should properly apply filter for the timezone - %s', async (timezone) => {
        useStripes.mockReturnValue({ timezone });

        const { result } = renderTestHook();

        await result.current.fetchOrderLines({
          searchParams: {
            [filter]: [dateTimeConfig.from, dateTimeConfig.to].join(':'),
          },
        });

        expect(getMock.mock.calls[0][1].searchParams.query).toContain(`(${dateFiltersMap[filter]}>="${dateTimeConfig.from}T00:00:00.000" and ${dateFiltersMap[filter]}<="${dateTimeConfig.to}T23:59:59.999")`);
      });
    });
  });
});
