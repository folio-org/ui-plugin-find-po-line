import {
  getKeywordQuery,
  QUERY_INDEX,
} from './OrderLinesSearchConfig';

const QUERY = 'query';

it('should return keyword query', () => {
  const keywordQuery = getKeywordQuery(
    QUERY,
    null,
    null,
    { [QUERY_INDEX.PRODUCT_IDS]: (q) => `productIds = "${q}*"` },
  );

  expect(keywordQuery).toBe(`contributors=="*${QUERY}*" or poLineNumber=="*${QUERY}*" or requester=="*${QUERY}*" or titleOrPackage=="*${QUERY}*" or publisher=="*${QUERY}*" or vendorDetail.vendorAccount=="*${QUERY}*" or vendorDetail.referenceNumbers=="*${QUERY}*" or donor=="*${QUERY}*" or selector=="*${QUERY}*" or physical.volumes=="*${QUERY}*" or productIds = "${QUERY}*"`);
});
