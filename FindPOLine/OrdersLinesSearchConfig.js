import { generateQueryTemplate } from '@folio/stripes-acq-components';

const indexes = [
  'contributors',
  'poLineNumber',
  'requester',
  'titleOrPackage',
  'publisher',
  'vendorDetail.vendorAccount',
  'vendorDetail.refNumber',
  'donor',
  'selector',
  'physical.volumes',
  'details.productIds',
];

export const queryTemplate = generateQueryTemplate(indexes);
