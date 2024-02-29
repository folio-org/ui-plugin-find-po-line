import { getDateRangeValueAsString } from './utils';

describe('Utils', () => {
  describe('getDateRangeValueAsString', () => {
    it('should return string value', () => {
      expect(getDateRangeValueAsString(['test'])).toEqual('test');
      expect(getDateRangeValueAsString('test')).toEqual('test');
    });
  });
});
