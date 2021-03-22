import { FILTERS } from './constants';

export const filterConfig = [
  {
    name: FILTERS.RECEIPT_STATUS,
    cql: FILTERS.RECEIPT_STATUS,
    values: [],
  },
  {
    name: FILTERS.PAYMENT_STATUS,
    cql: FILTERS.PAYMENT_STATUS,
    values: [],
  },
  {
    name: FILTERS.ACQUISITION_METHOD,
    cql: FILTERS.ACQUISITION_METHOD,
    values: [],
  },
  {
    name: FILTERS.LOCATION,
    cql: FILTERS.LOCATION,
    values: [],
  },
  {
    name: FILTERS.FUND_CODE,
    cql: FILTERS.FUND_CODE,
    values: [],
  },
  {
    name: FILTERS.ORDER_FORMAT,
    cql: FILTERS.ORDER_FORMAT,
    values: [],
  },
  {
    name: FILTERS.MATERIAL_TYPE_ELECTRONIC,
    cql: FILTERS.MATERIAL_TYPE_ELECTRONIC,
    values: [],
  },
  {
    name: FILTERS.MATERIAL_TYPE_PHYSICAL,
    cql: FILTERS.MATERIAL_TYPE_PHYSICAL,
    values: [],
  },
  {
    name: FILTERS.DATE_CREATED,
    cql: FILTERS.DATE_CREATED,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.VENDOR,
    cql: FILTERS.VENDOR,
    values: [],
  },
  {
    name: FILTERS.SOURCE_CODE,
    cql: FILTERS.SOURCE_CODE,
    values: [],
  },
  {
    name: FILTERS.COLLECTION,
    cql: FILTERS.COLLECTION,
    values: [],
  },
  {
    name: FILTERS.RUSH,
    cql: FILTERS.RUSH,
    values: [],
  },
  {
    name: FILTERS.ACCESS_PROVIDER,
    cql: FILTERS.ACCESS_PROVIDER,
    values: [],
  },
  {
    name: FILTERS.ACTIVATED,
    cql: FILTERS.ACTIVATED,
    values: [],
  },
  {
    name: FILTERS.EXPECTED_ACTIVATION_DATE,
    cql: FILTERS.EXPECTED_ACTIVATION_DATE,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.TRIAL,
    cql: FILTERS.TRIAL,
    values: [],
  },
  {
    name: FILTERS.SUBSCRIPTION_FROM,
    cql: FILTERS.SUBSCRIPTION_FROM,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.SUBSCRIPTION_TO,
    cql: FILTERS.SUBSCRIPTION_TO,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.ACTUAL_RECEIPT_DATE,
    cql: FILTERS.ACTUAL_RECEIPT_DATE,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.EXPECTED_RECEIPT_DATE,
    cql: FILTERS.EXPECTED_RECEIPT_DATE,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.RECEIPT_DUE,
    cql: FILTERS.RECEIPT_DUE,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.CLAIM,
    cql: FILTERS.CLAIM,
    values: [],
  },
  {
    name: FILTERS.CLAIM_GRACE,
    cql: FILTERS.CLAIM,
    values: [],
  },
  {
    name: FILTERS.CLAIM_SENT,
    cql: FILTERS.CLAIM,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.TAGS,
    cql: 'tags.tagList',
    values: [],
    operator: '=',
  },
  {
    name: FILTERS.IS_PACKAGE,
    cql: FILTERS.IS_PACKAGE,
    values: [],
  },
  {
    name: FILTERS.ACQUISITIONS_UNIT,
    cql: FILTERS.ACQUISITIONS_UNIT,
    values: [],
    operator: '=',
  },
  {
    name: FILTERS.PREFIX,
    cql: FILTERS.PREFIX,
    values: [],
  },
  {
    name: FILTERS.SUFFIX,
    cql: FILTERS.SUFFIX,
    values: [],
  },
];
