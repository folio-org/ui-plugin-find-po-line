import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  PAYMENT_STATUS,
  RECEIPT_STATUS,
} from '@folio/stripes-acq-components';

export const FILTERS = {
  ACCESS_PROVIDER: 'accessProvider',
  ACQUISITION_METHOD: 'acquisitionMethod',
  ACQUISITIONS_UNIT: 'purchaseOrder.acqUnitIds',
  ACTIVATED: 'activated',
  ACTUAL_RECEIPT_DATE: 'receiptDate',
  CLAIM_GRACE: 'grace',
  CLAIM_SENT: 'sent',
  CLAIM: 'claims',
  COLLECTION: 'collection',
  DATE_CREATED: 'createdDate',
  EXPECTED_ACTIVATION_DATE: 'expectedActivation',
  EXPECTED_RECEIPT_DATE: 'expectedReceiptDate',
  EXPENSE_CLASS: 'expenseClass',
  EXPORT_DATE: 'purchaseOrder.lastEDIExportDate',
  FUND_CODE: 'fundCode',
  IS_PACKAGE: 'isPackage',
  LOCATION: 'locations',
  MATERIAL_TYPE_ELECTRONIC: 'materialTypeElectronic',
  MATERIAL_TYPE_PHYSICAL: 'materialTypePhysical',
  ORDER_FORMAT: 'orderFormat',
  PAYMENT_STATUS: 'paymentStatus',
  PREFIX: 'purchaseOrder.poNumberPrefix',
  RECEIPT_DUE: 'receiptDue',
  RECEIPT_STATUS: 'receiptStatus',
  RUSH: 'rush',
  SOURCE_CODE: 'source',
  SUBSCRIPTION_FROM: 'subscriptionFrom',
  SUBSCRIPTION_TO: 'subscriptionTo',
  SUFFIX: 'purchaseOrder.poNumberSuffix',
  TAGS: 'tags',
  TRIAL: 'trial',
  VENDOR: 'purchaseOrder.vendor',
};

export const PAYMENT_STATUS_FILTER_OPTIONS = Object.keys(PAYMENT_STATUS).map(status => ({
  value: PAYMENT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.payment_status.${status}`} />,
}));

export const RECEIPT_STATUS_FILTER_OPTIONS = Object.keys(RECEIPT_STATUS).map(status => ({
  value: RECEIPT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.receipt_status.${status}`} />,
}));
