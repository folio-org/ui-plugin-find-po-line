import { dayjs } from '@folio/stripes/components';
import {
  CUSTOM_FIELDS_FILTER,
  CUSTOM_FIELDS_TYPES,
  DATE_FORMAT,
  generateQueryTemplate,
  getCustomFieldsKeywordIndexes,
} from '@folio/stripes-acq-components';

export const QUERY_INDEX = {
  CONTRIBUTORS: 'contributors',
  PO_LINE_NUMBER: 'poLineNumber',
  REQUESTER: 'requester',
  TITLE_OR_PACKAGE: 'titleOrPackage',
  PUBLISHER: 'publisher',
  VENDOR_ACCOUNT: 'vendorDetail.vendorAccount',
  REFERENCE_NUMBERS: 'vendorDetail.referenceNumbers',
  DONOR: 'donor',
  SELECTOR: 'selector',
  VOLUMES: 'physical.volumes',
  PRODUCT_IDS: 'details.productIds',
};

const indexes = Object.values(QUERY_INDEX);

export const indexISBN = {
  labelId: 'ui-orders.search.productIdISBN',
  value: 'productIdISBN',
};

export const searchableIndexes = [
  {
    labelId: 'ui-orders.search.keyword',
    value: '',
  },
  ...indexes.map(index => ({ labelId: `ui-orders.search.${index}`, value: index })),
  indexISBN,
];

export const getCqlQuery = (query, sIndex, localeDateFormat, customFields) => {
  const customField = customFields?.find(
    (cf) => `${CUSTOM_FIELDS_FILTER}.${cf.refId}` === sIndex,
  );

  if (customField?.type === CUSTOM_FIELDS_TYPES.DATE_PICKER) {
    const isoDate = dayjs.utc(query, localeDateFormat).format(DATE_FORMAT);

    return `${isoDate}*`;
  }

  return `*${query}*`;
};

export const queryTemplate = generateQueryTemplate(indexes);

const defaultSearchIndexQueryBuilder = (query, sIndex, localeDateFormat, customFields) => {
  const cqlQuery = getCqlQuery(query, sIndex, localeDateFormat, customFields);

  return `${sIndex}=="${cqlQuery}"`;
};

export const getKeywordQuery = (
  query,
  localeDateFormat,
  customFields,
  sIndexQueryBuildersDict = {},
) => {
  const customFieldIndexes = getCustomFieldsKeywordIndexes(customFields);

  return [...indexes, ...customFieldIndexes].reduce((acc, sIndex) => {
    const searchValue = sIndexQueryBuildersDict[sIndex]
      ? sIndexQueryBuildersDict[sIndex](query)
      : defaultSearchIndexQueryBuilder(query, sIndex, localeDateFormat, customFields);

    return acc ? `${acc} or ${searchValue}` : searchValue;
  }, '');
};
