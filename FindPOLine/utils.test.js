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
  })
});
