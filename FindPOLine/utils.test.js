import {
  CUSTOM_FIELDS_FILTER,
  CUSTOM_FIELDS_FIXTURE,
  SEARCH_INDEX_PARAMETER,
  SEARCH_PARAMETER,
} from '@folio/stripes-acq-components';

import { FILTERS } from './constants';
import {
  buildOrderLinesQuery,
  getDateRangeValueAsString,
} from './utils';

describe('Utils', () => {
  describe('getDateRangeValueAsString', () => {
    it('should return string value', () => {
      expect(getDateRangeValueAsString(['test'])).toEqual('test');
      expect(getDateRangeValueAsString('test')).toEqual('test');
    });
  });

  describe('buildOrderLinesQuery', () => {
    it('should return search query based on location filter', () => {
      const query = buildOrderLinesQuery({ [FILTERS.LOCATION]: 'locationId' });

      expect(query).toContain('(locations=="*locationId*" or searchLocationIds=="*locationId*")');
    });

    it('should return filter query based on datepicker custom field', () => {
      const query = buildOrderLinesQuery(
        { [`${CUSTOM_FIELDS_FILTER}.datepicker`]: '04-01-2020:04-30-2020' },
        null,
        null,
        'MM/DD/YYYY',
        CUSTOM_FIELDS_FIXTURE,
      );

      expect(query).toContain(
        `(${CUSTOM_FIELDS_FILTER}.datepicker>="2020-04-01T00:00:00.000" ` +
        'and ' +
        `${CUSTOM_FIELDS_FILTER}.datepicker<="2020-04-30T23:59:59.999")`,
      );
    });

    it('should return keyword query based on datepicker custom field', () => {
      const query = buildOrderLinesQuery(
        {
          [SEARCH_INDEX_PARAMETER]: `${CUSTOM_FIELDS_FILTER}.datepicker`,
          [SEARCH_PARAMETER]: '01/30/2021',
        },
        null,
        null,
        'MM/DD/YYYY',
        CUSTOM_FIELDS_FIXTURE,
      );

      expect(query).toContain('(customFields.datepicker==2021-01-30*)');
    });

    it('should return keyword query with custom fields indexes', () => {
      const query = buildOrderLinesQuery(
        { [SEARCH_PARAMETER]: 'abc' },
        null,
        null,
        'MM/DD/YYYY',
        CUSTOM_FIELDS_FIXTURE,
      );
      const parts = [
        'datepicker=="Invalid Date*"',
        'shorttext=="*abc*"',
        'longtext=="*abc*"',
      ].map((s) => `${CUSTOM_FIELDS_FILTER}.${s}`);

      expect(parts.every(s => query.includes(s))).toBe(true);
    });
  });
});
