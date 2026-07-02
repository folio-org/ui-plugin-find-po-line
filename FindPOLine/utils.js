import {
  buildDateRangeQuery,
  buildDateTimeRangeQuery,
  buildFilterQuery,
  buildMultiOptionCqlQuery,
  buildSortingQuery,
  connectQuery,
  CQLBuilder,
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
  formatSearchCql,
  getKeywordQuery,
} from './OrderLinesSearchConfig';

const defaultSearchFn = (localeDateFormat, customFields = []) => (query, qindex) => {
  if (qindex) {
    return formatSearchCql(query, qindex, localeDateFormat, customFields);
  }

  return getKeywordQuery(
    query,
    localeDateFormat,
    customFields,
  );
};

export const getDateRangeValueAsString = (filterValue = '') => {
  if (Array.isArray(filterValue)) {
    return filterValue[0];
  }

  return filterValue;
};

const buildEqualCqlQuery = (sIndex, sQuery) => new CQLBuilder().equal(sIndex, sQuery).build();

const buildMultiOptionCqlEqualQuery = (sIndex, sQuery) => {
  return buildMultiOptionCqlQuery(sIndex, sQuery, { operator: CQLBuilder.OPERATORS.EQUAL });
};

const buildLocationsQuery = (filterValue) => {
  const query = [
    buildMultiOptionCqlQuery(FILTERS.LOCATION, filterValue, { modifiers: [{ name: '@locationId' }] }),
    buildMultiOptionCqlQuery('searchLocations', filterValue),
  ].join(` ${CQLBuilder.OPERATORS.OR} `);

  return `(${query})`;
};

export const buildOrderLinesQuery = (
  queryParams,
  isbnId,
  normalizedISBN,
  localeDateFormat,
  customFields,
  options = {},
) => {
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
      [FILTERS.TAGS]: buildMultiOptionCqlQuery.bind(null, FILTERS.TAGS),
      [FILTERS.FUND_CODE]: (filterValue) => buildMultiOptionCqlQuery(FILTERS.FUND_DISTRIBUTION, filterValue, { modifiers: [{ name: '@fundId' }] }),
      [FILTERS.EXPENSE_CLASS]: buildMultiOptionCqlQuery.bind(null, FILTERS.FUND_DISTRIBUTION),
      [FILTERS.LOCATION]: (filterValue) => buildLocationsQuery(filterValue),
      [FILTERS.DONOR]: buildMultiOptionCqlQuery.bind(null, [FILTERS.DONOR]),
      [FILTERS.ACQUISITIONS_UNIT]: buildMultiOptionCqlQuery.bind(null, FILTERS.ACQUISITIONS_UNIT),
      [FILTERS.MATERIAL_TYPE_PHYSICAL]: buildEqualCqlQuery.bind(null, 'physical.materialType'),
      [FILTERS.MATERIAL_TYPE_ELECTRONIC]: buildEqualCqlQuery.bind(null, 'eresource.materialType'),
      [FILTERS.ACCESS_PROVIDER]: buildEqualCqlQuery.bind(null, `eresource.${FILTERS.ACCESS_PROVIDER}`),
      [FILTERS.ACTIVATED]: buildMultiOptionCqlEqualQuery.bind(null, `eresource.${FILTERS.ACTIVATED}`),
      [FILTERS.TRIAL]: buildMultiOptionCqlEqualQuery.bind(null, `eresource.${FILTERS.TRIAL}`),
      ...getCustomFieldsFilterMap(customFields),
    },
    true,
    options,
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

  return async (options = {}) => {
    const isbnData = await (isISBNSearch ? getNormalizedISBN(isbnNumber, ky) : Promise.resolve({}));

    if (isbnData?.isError) return undefined;

    return buildOrderLinesQuery(
      queryParams,
      isbnData?.isbn,
      isbnData?.isbnType,
      localeDateFormat,
      customFields,
      options,
    );
  };
}

/**
 * Generate options with deprecated labels for a dropdown.
 * @param {object[]} records - array of json objects with { name, deprecated }
 * @param {class} intl - class for internationalization
 * @param {string} deprecatedMessageId - intl message ID for labels
 * @returns {object[]} array of {label, value} pairs.
 */
const generateOptionsWithDeprecationLabels = (
  records,
  intl,
  deprecatedMessageId,
) => records
  .map(({ name, deprecated }) => {
    return {
      label: deprecated
        ? intl.formatMessage({ id: deprecatedMessageId }, { name })
        : name,
      value: name,
    };
  });

/**
 * Calculate the options of a prefix to use in a dropdown.
 * https://github.com/folio-org/acq-models/blob/master/mod-orders-storage/schemas/prefix.json
 * @param {object[]} records - array of json objects (prefix) with { name, deprecated }
 * @param {string} initialSelectedValue - the value of the dropdown on initialization
 * @param {class} intl - class for internationalization
 * @returns {object[]} array of {label, value} pairs.
 */
export const getPrefixOptions = (
  records,
  intl,
) => generateOptionsWithDeprecationLabels(
  records,
  intl,
  'ui-plugin-find-po-line.filter.prefixFilter.deprecated',
);

/**
 * Calculate the options of a suffix to use in a dropdown.
 * https://github.com/folio-org/acq-models/blob/master/mod-orders-storage/schemas/suffix.json
 * @param {object[]} records - array of json objects (suffix) with { name, deprecated }
 * @param {class} intl - class for internationalization
 * @returns {object[]} array of {label, value} pairs.
 */
export const getSuffixOptions = (
  records,
  intl,
) => generateOptionsWithDeprecationLabels(
  records,
  intl,
  'ui-plugin-find-po-line.filter.suffixFilter.deprecated',
);
