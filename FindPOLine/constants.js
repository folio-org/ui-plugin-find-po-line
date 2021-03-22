import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  ACQUISITION_METHOD,
  PAYMENT_STATUS,
  RECEIPT_STATUS,
} from '@folio/stripes-acq-components';

export const FILTERS = {
  ACCESS_PROVIDER: 'eresource.accessProvider',
  ACQUISITION_METHOD: 'acquisitionMethod',
  ACQUISITIONS_UNIT: 'acqUnitIds',
  ACTIVATED: 'eresource.activated',
  ACTUAL_RECEIPT_DATE: 'receiptDate',
  CLAIM_GRACE: 'grace',
  CLAIM_SENT: 'sent',
  CLAIM: 'claims',
  COLLECTION: 'collection',
  DATE_CREATED: 'metadata.createdDate',
  EXPECTED_ACTIVATION_DATE: 'eresource.expectedActivation',
  EXPECTED_RECEIPT_DATE: 'physical.expectedReceiptDate',
  FUND_CODE: 'fundDistribution',
  IS_PACKAGE: 'isPackage',
  LOCATION: 'locations',
  MATERIAL_TYPE_ELECTRONIC: 'eresource.materialType',
  MATERIAL_TYPE_PHYSICAL: 'physical.materialType',
  ORDER_FORMAT: 'orderFormat',
  PAYMENT_STATUS: 'paymentStatus',
  PREFIX: 'poNumberPrefix',
  RECEIPT_DUE: 'physical.receiptDue',
  RECEIPT_STATUS: 'receiptStatus',
  RUSH: 'rush',
  SOURCE_CODE: 'source',
  SUBSCRIPTION_FROM: 'details.subscriptionFrom',
  SUBSCRIPTION_TO: 'details.subscriptionTo',
  SUFFIX: 'poNumberSuffix',
  TAGS: 'tags',
  TRIAL: 'eresource.trial',
  VENDOR: 'vendor',
};

export const ACQUISITION_METHOD_FILTER_OPTIONS = Object.keys(ACQUISITION_METHOD).map(key => ({
  value: ACQUISITION_METHOD[key],
  label: <FormattedMessage id={`ui-orders.acquisition_method.${key}`} />,
}));

export const PAYMENT_STATUS_FILTER_OPTIONS = Object.keys(PAYMENT_STATUS).map(status => ({
  value: PAYMENT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.payment_status.${status}`} />,
}));

export const RECEIPT_STATUS_FILTER_OPTIONS = Object.keys(RECEIPT_STATUS).map(status => ({
  value: RECEIPT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.receipt_status.${status}`} />,
}));
