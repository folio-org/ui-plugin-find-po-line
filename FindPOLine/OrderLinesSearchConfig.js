import moment from 'moment';

import {
  CUSTOM_FIELDS_FILTER,
  CUSTOM_FIELDS_TYPES,
  DATE_FORMAT,
  generateQueryTemplate,
  getCustomFieldsKeywordIndexes,
} from '@folio/stripes-acq-components';

const indexes = [
  'contributors',
  'poLineNumber',
  'requester',
  'titleOrPackage',
  'publisher',
  'vendorDetail.vendorAccount',
  'vendorDetail.referenceNumbers',
  'donor',
  'selector',
  'physical.volumes',
  'details.productIds',
];

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
    const isoDate = moment.utc(query, localeDateFormat).format(DATE_FORMAT);

    return `${isoDate}*`;
  }

  return `*${query}*`;
};

export const queryTemplate = generateQueryTemplate(indexes);

export const getKeywordQuery = (query, localeDateFormat, customFields) => {
  const customFieldIndexes = getCustomFieldsKeywordIndexes(customFields);

  return [...indexes, ...customFieldIndexes].reduce(
    (acc, sIndex) => {
      const cqlQuery = getCqlQuery(query, sIndex, localeDateFormat, customFields);

      if (acc) {
        return `${acc} or ${sIndex}=="${cqlQuery}"`;
      } else {
        return `${sIndex}=="${cqlQuery}"`;
      }
    },
    '',
  );
};
