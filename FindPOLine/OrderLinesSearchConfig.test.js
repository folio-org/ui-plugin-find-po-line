import { CQLBuilder } from '@folio/stripes-acq-components';

import {
  getKeywordQuery,
  QUERY_INDEX,
} from './OrderLinesSearchConfig';

const { EQUAL, FUZZY } = CQLBuilder.OPERATORS;
const QUERY = 'query';

it('should return keyword query', () => {
  const keywordQuery = getKeywordQuery(
    QUERY,
    null,
    null,
    { [QUERY_INDEX.PRODUCT_IDS]: (q) => `productIds = "${q}*"` },
  );

  expect(keywordQuery).toBe([
    `contributorName${FUZZY}"${QUERY}"`,
    `poLineNumber${EQUAL}"${QUERY}"`,
    `requester${FUZZY}"${QUERY}"`,
    `titleOrPackage${FUZZY}"${QUERY}"`,
    `publisher${FUZZY}"${QUERY}"`,
    `vendorDetail.vendorAccount${EQUAL}"${QUERY}"`,
    `vendorDetail.referenceNumbers${FUZZY}"${QUERY}"`,
    `donor${FUZZY}"${QUERY}"`,
    `selector${FUZZY}"${QUERY}"`,
    `physicalVolumes${FUZZY}"${QUERY}"`,
    `productIds${FUZZY}"${QUERY}"`,
  ].join(' or '));
});
