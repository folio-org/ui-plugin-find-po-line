import { dayjs } from '@folio/stripes/components';
import {
  CQLBuilder,
  CUSTOM_FIELDS_FILTER,
  CUSTOM_FIELDS_TYPES,
  DATE_FORMAT,
  getCustomFieldsKeywordIndexes,
} from '@folio/stripes-acq-components';

export const QUERY_INDEX = {
  CONTRIBUTORS: 'contributorName',
  PO_LINE_NUMBER: 'poLineNumber',
  REQUESTER: 'requester',
  TITLE_OR_PACKAGE: 'titleOrPackage',
  PUBLISHER: 'publisher',
  VENDOR_ACCOUNT: 'vendorDetail.vendorAccount',
  REFERENCE_NUMBERS: 'vendorDetail.referenceNumbers',
  DONOR: 'donor',
  SELECTOR: 'selector',
  VOLUMES: 'physicalVolumes',
  PRODUCT_IDS: 'productIds',
};

const indexes = Object.values(QUERY_INDEX);

const searchIndexTranslationKeyDict = {
  [QUERY_INDEX.CONTRIBUTORS]: 'contributors',
  [QUERY_INDEX.PRODUCT_IDS]: 'details.productIds',
  [QUERY_INDEX.VOLUMES]: 'physical.volumes',
};

export const indexISBN = {
  labelId: 'ui-orders.search.productIdISBN',
  value: 'productIdISBN',
};

export const searchableIndexes = [
  {
    labelId: 'ui-orders.search.keyword',
    value: '',
  },
  ...indexes.map(index => ({ labelId: `ui-orders.search.${searchIndexTranslationKeyDict[index] || index}`, value: index })),
  indexISBN,
];

const buildEqualQuery = (sIndex, sQuery) => new CQLBuilder().equal(sIndex, sQuery).build();

// This formatters define how index, relation, modifiers and value should be formatted for specific search indexes.
const cqlFormatters = [
  {
    selector: (qIndex, _customFields) => qIndex === QUERY_INDEX.PO_LINE_NUMBER,
    formatter: buildEqualQuery,
  },
  {
    selector: (qIndex, _customFields) => qIndex === QUERY_INDEX.VENDOR_ACCOUNT,
    formatter: buildEqualQuery,
  },
  {
    selector: (qIndex, customFields) => {
      const customField = customFields?.find((cf) => `${CUSTOM_FIELDS_FILTER}.${cf.refId}` === qIndex);

      return customField?.type === CUSTOM_FIELDS_TYPES.DATE_PICKER;
    },
    formatter: buildEqualQuery,
  },
];

const getCqlQuery = (query, sIndex, localeDateFormat, customFields) => {
  const customField = customFields?.find((cf) => `${CUSTOM_FIELDS_FILTER}.${cf.refId}` === sIndex);

  if (customField?.type === CUSTOM_FIELDS_TYPES.DATE_PICKER) {
    const isoDate = dayjs.utc(query, localeDateFormat).format(DATE_FORMAT);

    return `${isoDate}*`;
  }

  return query;
};

/**
 * Formats the search CQL query based on the provided index, locale date format, and custom fields.
 * Define CQL formatting rules for specific search indexes in the `formatSearchCqlMap` object.
 * Some indexes apply specific relations, such as equality or fuzzy matching.
 *
 * @param {string} query - The search query.
 * @param {string} sIndex - The search index.
 * @param {string} localeDateFormat - The locale date format.
 * @param {Array} customFields - The custom fields.
 * @returns {string} The formatted CQL query.
 */
export const formatSearchCql = (query, sIndex, localeDateFormat, customFields) => {
  const cqlQueryValue = getCqlQuery(query, sIndex, localeDateFormat, customFields);
  const formatCqlFn = cqlFormatters.find(({ selector }) => selector(sIndex, customFields))?.formatter;

  return formatCqlFn
    ? formatCqlFn(sIndex, cqlQueryValue)
    : new CQLBuilder().fuzzy(sIndex, cqlQueryValue).build();
};

export const getKeywordQuery = (
  query,
  localeDateFormat,
  customFields,
) => {
  const customFieldIndexes = getCustomFieldsKeywordIndexes(customFields);

  return [...indexes, ...customFieldIndexes].reduce(
    (acc, sIndex) => {
      const formattedQuery = formatSearchCql(query, sIndex, localeDateFormat, customFields);

      return acc ? `${acc} or ${formattedQuery}` : formattedQuery;
    },
    '',
  );
};
