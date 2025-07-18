import {
  buildArrayFieldQuery,
  buildDateRangeQuery,
  buildDateTimeRangeQuery,
  buildFilterQuery,
  buildSortingQuery,
  connectQuery,
  getCustomFieldsFilterMap,
  IDENTIFIER_TYPES_API,
  SEARCH_INDEX_PARAMETER,
  SEARCH_PARAMETER,
} from '@folio/stripes-acq-components';

import {
  FILTERS,
  QUALIFIER_SEPARATOR,
} from './constants';
import {
  getCqlQuery,
  getKeywordQuery,
  QUERY_INDEX,
} from './OrderLinesSearchConfig';

const buildProductIdsSearchQuery = (query) => {
  return `productIds = "${query}*"`;
};

const defaultSearchFn = (localeDateFormat, customFields = []) => (query, qindex) => {
  if (qindex === QUERY_INDEX.PRODUCT_IDS) {
    return buildProductIdsSearchQuery(query);
  }

  if (qindex) {
    const cqlQuery = getCqlQuery(query, qindex, localeDateFormat, customFields);

    return `(${qindex}==${cqlQuery})`;
  }

  return getKeywordQuery(
    query,
    localeDateFormat,
    customFields,
    {
      [QUERY_INDEX.PRODUCT_IDS]: buildProductIdsSearchQuery,
    },
  );
};

export const getDateRangeValueAsString = (filterValue = '') => {
  if (Array.isArray(filterValue)) {
    return filterValue[0];
  }

  return filterValue;
};

export const buildOrderLinesQuery = (queryParams, isbnId, normalizedISBN, localeDateFormat, customFields) => {
  const searchFn = normalizedISBN
    ? () => `details.productIds all \\"productId\\": \\"${normalizedISBN}\\"  AND details.productIds all  \\"productIdType\\": \\"${isbnId}\\"`
    : defaultSearchFn(localeDateFormat, customFields);

  const queryParamsFilterQuery = buildFilterQuery(
    queryParams,
    searchFn,
    {
      [FILTERS.EXPORT_DATE]: buildDateRangeQuery.bind(null, FILTERS.EXPORT_DATE),
      [FILTERS.DATE_CREATED]: buildDateTimeRangeQuery.bind(null, FILTERS.DATE_CREATED),
      [FILTERS.DATE_UPDATED]: buildDateTimeRangeQuery.bind(null, FILTERS.DATE_UPDATED),
      [FILTERS.EXPECTED_ACTIVATION_DATE]: buildDateRangeQuery.bind(null, `eresource.${FILTERS.EXPECTED_ACTIVATION_DATE}`),
      [FILTERS.SUBSCRIPTION_FROM]: buildDateRangeQuery.bind(null, `details.${FILTERS.SUBSCRIPTION_FROM}`),
      [FILTERS.SUBSCRIPTION_TO]: buildDateRangeQuery.bind(null, `details.${FILTERS.SUBSCRIPTION_TO}`),
      [FILTERS.ACTUAL_RECEIPT_DATE]: buildDateRangeQuery.bind(null, [FILTERS.ACTUAL_RECEIPT_DATE]),
      [FILTERS.EXPECTED_RECEIPT_DATE]: buildDateRangeQuery.bind(null, `physical.${FILTERS.EXPECTED_RECEIPT_DATE}`),
      [FILTERS.RECEIPT_DUE]: buildDateRangeQuery.bind(null, `physical.${FILTERS.RECEIPT_DUE}`),
      [FILTERS.CLAIM_SENT]: buildDateRangeQuery.bind(null, [FILTERS.CLAIM_SENT]),
      [FILTERS.TAGS]: buildArrayFieldQuery.bind(null, [FILTERS.TAGS]),
      [FILTERS.FUND_CODE]: (filterValue) => `fundDistribution =/@fundId (${Array.isArray(filterValue) ? filterValue.join(' or ') : filterValue})`,
      [FILTERS.EXPENSE_CLASS]: buildArrayFieldQuery.bind(null, [FILTERS.FUND_DISTRIBUTION]),
      [FILTERS.LOCATION]: (filterValue) => `(${
        [FILTERS.LOCATION, 'searchLocationIds']
          .map((filterKey) => buildArrayFieldQuery(filterKey, filterValue))
          .join(' or ')
      })`,
      [FILTERS.DONOR]: buildArrayFieldQuery.bind(null, [FILTERS.DONOR]),
      [FILTERS.ACQUISITIONS_UNIT]: buildArrayFieldQuery.bind(null, [FILTERS.ACQUISITIONS_UNIT]),
      [FILTERS.MATERIAL_TYPE_PHYSICAL]: (filterValue) => `physical.materialType == ${filterValue}`,
      [FILTERS.MATERIAL_TYPE_ELECTRONIC]: (filterValue) => `eresource.materialType == ${filterValue}`,
      [FILTERS.ACCESS_PROVIDER]: (filterValue) => `eresource.${FILTERS.ACCESS_PROVIDER} == ${filterValue}`,
      [FILTERS.ACTIVATED]: (filterValue) => `eresource.${FILTERS.ACTIVATED} == ${filterValue}`,
      [FILTERS.TRIAL]: (filterValue) => `eresource.${FILTERS.TRIAL} == ${filterValue}`,
      ...getCustomFieldsFilterMap(customFields),
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

export function getLinesQuery(queryParams, ky, localeDateFormat, customFields) {
  const isISBNSearch = queryParams[SEARCH_INDEX_PARAMETER] === 'productIdISBN';
  const isbnNumber = queryParams[SEARCH_PARAMETER]?.split(QUALIFIER_SEPARATOR)[0];

  return async () => {
    const isbnData = await (isISBNSearch ? getNormalizedISBN(isbnNumber, ky) : Promise.resolve({}));

    if (isbnData?.isError) return undefined;

    return buildOrderLinesQuery(queryParams, isbnData?.isbn, isbnData?.isbnType, localeDateFormat, customFields);
  };
}

export const getPrefixSuffixOptions = (records, intl) => (
  records.map(({ name, deprecated }) => {
    const deprecatedText = intl.formatMessage(
      {
        id: 'ui-plugin-find-po-line.filter.suffixFilter.deprecated',
      },
      {
        name,
      },
    );

    return {
      label: deprecated ? deprecatedText : name,
      value: name,
    };
  })
);
