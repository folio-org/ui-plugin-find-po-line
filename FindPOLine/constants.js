import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FILTERS = {
  ACCESS_PROVIDER: 'accessProvider',
  ACQUISITION_METHOD: 'acquisitionMethod',
  ACTIVATED: 'activated',
  ACTUAL_RECEIPT_DATE: 'receiptDate',
  CLAIM_GRACE: 'grace',
  CLAIM_SENT: 'sent',
  CLAIM: 'claims',
  COLLECTION: 'collection',
  DATE_CREATED: 'createdDate',
  EXPECTED_ACTIVATION_DATE: 'expectedActivation',
  EXPECTED_RECEIPT_DATE: 'expectedReceiptDate',
  FUND_CODE: 'fundDistribution',
  IS_PACKAGE: 'isPackage',
  LOCATION: 'locations',
  MATERIAL_TYPE_ELECTRONIC: 'materialTypeElectronic',
  MATERIAL_TYPE_PHYSICAL: 'materialTypePhysical',
  ORDER_FORMAT: 'orderFormat',
  PAYMENT_STATUS: 'paymentStatus',
  RECEIPT_DUE: 'receiptDue',
  RECEIPT_STATUS: 'receiptStatus',
  RUSH: 'rush',
  SOURCE_CODE: 'source',
  SUBSCRIPTION_FROM: 'subscriptionFrom',
  SUBSCRIPTION_TO: 'subscriptionTo',
  TAGS: 'tags',
  TRIAL: 'trial',
  VENDOR: 'vendor',
};

export const ACQUISITION_METHOD = {
  approvalPlan: 'Approval Plan',
  dda: 'Demand Driven Acquisitions (DDA)',
  depository: 'Depository',
  eba: 'Evidence Based Acquisitions (EBA)',
  exchange: 'Exchange',
  gift: 'Gift',
  purchaseAtVendorSystem: 'Purchase At Vendor System',
  purchase: 'Purchase',
  technical: 'Technical',
};

export const ACQUISITION_METHOD_FILTER_OPTIONS = Object.keys(ACQUISITION_METHOD).map(key => ({
  value: ACQUISITION_METHOD[key],
  label: <FormattedMessage id={`ui-orders.acquisition_method.${key}`} />,
}));

export const ERESOURCE = 'Electronic Resource';
export const PHYSICAL = 'Physical Resource';
export const PE_MIX = 'P/E Mix';
export const OTHER = 'Other';

export const ORDER_FORMAT = {
  electronicResource: ERESOURCE,
  physicalResource: PHYSICAL,
  PEMix: PE_MIX,
  other: OTHER,
};

export const ORDER_FORMAT_FILTER_OPTIONS = Object.keys(ORDER_FORMAT).map(key => ({
  value: ORDER_FORMAT[key],
  label: <FormattedMessage id={`ui-orders.order_format.${key}`} />,
}));

export const PAYMENT_STATUS = {
  awaitingPayment: 'Awaiting Payment',
  cancelled: 'Cancelled',
  fullyPaid: 'Fully Paid',
  partiallyPaid: 'Partially Paid',
  paymentNotRequired: 'Payment Not Required',
  pending: 'Pending',
};

export const PAYMENT_STATUS_FILTER_OPTIONS = Object.keys(PAYMENT_STATUS).map(status => ({
  value: PAYMENT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.payment_status.${status}`} />,
}));

export const RECEIPT_STATUS = {
  awaitingReceipt: 'Awaiting Receipt',
  cancelled: 'Cancelled',
  fullyReceived: 'Fully Received',
  partiallyReceived: 'Partially Received',
  pending: 'Pending',
  receiptNotRequired: 'Receipt Not Required',
};

export const RECEIPT_STATUS_FILTER_OPTIONS = Object.keys(RECEIPT_STATUS).map(status => ({
  value: RECEIPT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.receipt_status.${status}`} />,
}));
