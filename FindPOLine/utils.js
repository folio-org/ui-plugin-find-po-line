import {
  buildArrayFieldQuery,
  buildDateRangeQuery,
  buildDateTimeRangeQuery,
  buildFilterQuery,
  buildSortingQuery,
  connectQuery,
  SEARCH_INDEX_PARAMETER,
  SEARCH_PARAMETER,
  IDENTIFIER_TYPES_API,
} from '@folio/stripes-acq-components';

import { FILTERS, QUALIFIER_SEPARATOR } from './constants';
import { getKeywordQuery } from './OrderLinesSearchConfig';

function defaultSearchFn(query, qindex) {
  if (qindex === 'details.productIds') {
    return `details.productIds = "/@productId = "${query}"* `;
  }

  if (qindex) {
    return `(${qindex}=="*${query}*")`;
  }

  return getKeywordQuery(query);
}

export const buildOrderLinesQuery = (queryParams, isbnId, normalizedISBN) => {
  const searchFn = normalizedISBN
    ? () => `details.productIds all \\"productId\\": \\"${normalizedISBN}\\"  AND details.productIds all  \\"productIdType\\": \\"${isbnId}\\"`
    : defaultSearchFn;

  const queryParamsFilterQuery = buildFilterQuery(
    queryParams,
    searchFn,
    {
      [FILTERS.EXPORT_DATE]: buildDateRangeQuery.bind(null, FILTERS.EXPORT_DATE),
      [FILTERS.DATE_CREATED]: buildDateTimeRangeQuery.bind(null, `metadata.${FILTERS.DATE_CREATED}`),
      [FILTERS.EXPECTED_ACTIVATION_DATE]: buildDateRangeQuery.bind(null, `eresource.${FILTERS.EXPECTED_ACTIVATION_DATE}`),
      [FILTERS.SUBSCRIPTION_FROM]: buildDateRangeQuery.bind(null, `details.${FILTERS.SUBSCRIPTION_FROM}`),
      [FILTERS.SUBSCRIPTION_TO]: buildDateRangeQuery.bind(null, `details.${FILTERS.SUBSCRIPTION_TO}`),
      [FILTERS.ACTUAL_RECEIPT_DATE]: buildDateRangeQuery.bind(null, [FILTERS.ACTUAL_RECEIPT_DATE]),
      [FILTERS.EXPECTED_RECEIPT_DATE]: buildDateRangeQuery.bind(null, `physical.${FILTERS.EXPECTED_RECEIPT_DATE}`),
      [FILTERS.RECEIPT_DUE]: buildDateRangeQuery.bind(null, `physical.${FILTERS.RECEIPT_DUE}`),
      [FILTERS.CLAIM_SENT]: buildDateRangeQuery.bind(null, [FILTERS.CLAIM_SENT]),
      [FILTERS.TAGS]: buildArrayFieldQuery.bind(null, [FILTERS.TAGS]),
      [FILTERS.FUND_CODE]: buildArrayFieldQuery.bind(null, ['fundDistribution']),
      [FILTERS.EXPENSE_CLASS]: buildArrayFieldQuery.bind(null, ['fundDistribution']),
      [FILTERS.LOCATION]: buildArrayFieldQuery.bind(null, [FILTERS.LOCATION]),
      [FILTERS.ACQUISITIONS_UNIT]: buildArrayFieldQuery.bind(null, [FILTERS.ACQUISITIONS_UNIT]),
      [FILTERS.MATERIAL_TYPE_PHYSICAL]: (filterValue) => `physical.materialType == ${filterValue}`,
      [FILTERS.MATERIAL_TYPE_ELECTRONIC]: (filterValue) => `eresource.materialType == ${filterValue}`,
      [FILTERS.ACCESS_PROVIDER]: (filterValue) => `eresource.${FILTERS.ACCESS_PROVIDER} == ${filterValue}`,
      [FILTERS.ACTIVATED]: (filterValue) => `eresource.${FILTERS.ACTIVATED} == ${filterValue}`,
      [FILTERS.TRIAL]: (filterValue) => `eresource.${FILTERS.TRIAL} == ${filterValue}`,
    },
  );

  const filterQuery = queryParamsFilterQuery || 'cql.allRecords=1';
  const sortingQuery = buildSortingQuery(queryParams) || 'sortby metadata.updatedDate/sort.descending';

  return connectQuery(filterQuery, sortingQuery);
};

export const getNormalizedISBN = async (isbnNumber, ky) => {
  const isbnTypeSearchParams = {
    query: '(name=="isbn")',
    limit: 1,
  };

  const isbnTypesPromise = ky.get(IDENTIFIER_TYPES_API, { searchParams: isbnTypeSearchParams }).json();
  const isbnPromise = ky.get(`isbn/convertTo13?isbn=${isbnNumber}&hyphens=false`).json();

  try {
    const [{ identifierTypes }, { isbn }] = await Promise.all([isbnTypesPromise, isbnPromise]);

    return { isbn, isbnType: identifierTypes[0]?.id };
  } catch (e) {
    return { isError: true };
  }
};

export function getLinesQuery(queryParams, ky) {
  const isISBNSearch = queryParams[SEARCH_INDEX_PARAMETER] === 'productIdISBN';
  const isbnNumber = queryParams[SEARCH_PARAMETER]?.split(QUALIFIER_SEPARATOR)[0];

  return async () => {
    const isbnData = await (isISBNSearch ? getNormalizedISBN(isbnNumber, ky) : Promise.resolve({}));
    
    if (isbnData?.isError) return undefined;

    return buildOrderLinesQuery(queryParams, isbnData?.isbn, isbnData?.isbnType);
  };
}
