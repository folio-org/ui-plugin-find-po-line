import {
  configFunds,
  configMemberships,
  configUnits,
  configUsers,
  configVendors,
  configTags,
  configLocations,
  configMaterialTypes,
  configLines,
} from '@folio/stripes-acq-components/test/bigtest/network';

export default function config() {
  configFunds(this);
  configMemberships(this);
  configUnits(this);
  configUsers(this);
  configVendors(this);
  configTags(this);
  configLines(this);
  configLocations(this);
  configMaterialTypes(this);
}
